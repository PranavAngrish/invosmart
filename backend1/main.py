from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, engine
from models import Base, User, Invoice, GRN, PurchaseOrder
from pydantic_models import (
    UserCreate, UserResponse, InvoiceSchema, 
    GRNSchema, PurchaseOrderSchema
)
from email_service import EmailService
from rpa_invoice_monitor import InvoiceMonitor
import jwt
from passlib.context import CryptContext
import os

from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
import os

from database import SessionLocal, engine
from models import Base, User, Invoice, GRN, PurchaseOrder
from pydantic_models import (
    UserCreate, UserResponse, InvoiceSchema, 
    GRNSchema, PurchaseOrderSchema
)
from email_service import EmailService
from rpa_invoice_monitor import InvoiceMonitor
from ocr_invoice_extraction import extract_invoice_data, extract_json_invoice

# Previous authentication and other imports remain the same

Base.metadata.create_all(bind=engine)

app = FastAPI()

# ... (previous dependencies and configurations remain)

@app.post("/upload-invoice", response_model=InvoiceSchema)
async def upload_invoice(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    background_tasks= BackgroundTasks
):
    # Save uploaded file
    upload_dir = "invoices"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        # Process invoice using OCR
        vector_index = extract_invoice_data(file_path)
        
        if not vector_index:
            raise HTTPException(status_code=400, detail="Failed to process invoice")

        # Extract invoice data
        invoice_data = extract_json_invoice(vector_index)
        
        if not invoice_data or "error" in invoice_data:
            raise HTTPException(status_code=400, detail="Failed to extract invoice details")

        # Create invoice record
        new_invoice = Invoice(
            user_id=current_user.id,
            ocr_json=invoice_data,
            original_filename=file.filename,
            validation_status='pending'
        )
        db.add(new_invoice)
        db.commit()
        db.refresh(new_invoice)

        # Background task for validation
        background_tasks.add_task(
            validate_invoice, 
            invoice_id=new_invoice.id, 
            db_session=db
        )

        return InvoiceSchema.from_orm(new_invoice)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Invoice processing error: {str(e)}")

def validate_invoice(invoice_id: int, db_session: Session):
    """
    Validate invoice against backend data
    """
    try:
        # Retrieve invoice
        invoice = db_session.query(Invoice).filter(Invoice.id == invoice_id).first()
        
        if not invoice:
            return

        # Extract PO number from invoice data
        po_number = invoice.ocr_json.get('invoice_info', {}).get('po_number')
        
        # Check against Purchase Orders
        po_match = db_session.query(PurchaseOrder).filter_by(po_number=po_number).first()
        
        # Check against Goods Receipt Notes
        grn_match = db_session.query(GRN).filter_by(po_number=po_number).first()

        # Update validation status
        if po_match and grn_match:
            invoice.validation_status = 'validated'
        elif po_match or grn_match:
            invoice.validation_status = 'partial_match'
        else:
            invoice.validation_status = 'no_match'

        db_session.commit()

    except Exception as e:
        print(f"Invoice validation error: {e}")