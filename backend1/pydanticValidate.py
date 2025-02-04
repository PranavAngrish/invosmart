from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_verified: bool

    class Config:
        orm_mode = True

class InvoiceInfoSchema(BaseModel):
    number: str
    date: str
    due_date: str
    po_number: Optional[str] = None

class AddressSchema(BaseModel):
    name: str
    address: List[str]

class LineItemSchema(BaseModel):
    description: str
    unit_price: float
    amount: float

class InvoiceSummarySchema(BaseModel):
    subtotal: float
    tax_rate: Optional[float] = None
    tax_amount: float
    total: float

class InvoiceSchema(BaseModel):
    invoice_info: InvoiceInfoSchema
    bill_to: AddressSchema
    ship_to: Optional[AddressSchema] = None
    line_items: List[LineItemSchema]
    summary: InvoiceSummarySchema

    class Config:
        orm_mode = True

class GRNSchema(BaseModel):
    po_number: str
    description: str
    quantity: int
    received_date: datetime

class PurchaseOrderSchema(BaseModel):
    po_number: str
    vendor: str
    total_amount: float
    created_date: datetime