# app/main.py
import os
import re
import json
import logging
from datetime import datetime
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import Invoice, PurchaseOrder, GRN
from .schemas import InvoiceCreate, InvoiceResponse
from .services import EmailMonitor, OCRProcessor
from .config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Invoice Processing System", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    logger.info("Starting email monitoring background task")
    BackgroundTasks().add_task(EmailMonitor(settings).start_monitoring)

@app.post("/process-pdf/", response_model=InvoiceResponse)
async def process_pdf_endpoint(db: Session = get_db):
    try:
        # In real implementation, receive file upload
        result = OCRProcessor.process_invoice("inv.pdf")
        
        invoice_record = Invoice(
            original_filename="inv.pdf",
            ocr_json=result,
            validation_status="pending"
        )
        db.add(invoice_record)
        db.commit()
        return invoice_record
    except Exception as e:
        logger.error(f"Processing error: {str(e)}")
        raise HTTPException(status_code=500, detail="Invoice processing failed")

@app.get("/invoices/", response_model=list[InvoiceResponse])
async def list_invoices(skip: int = 0, limit: int = 100, db: Session = get_db):
    return db.query(Invoice).offset(skip).limit(limit).all()

@app.get("/invoices/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(invoice_id: int, db: Session = get_db):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)