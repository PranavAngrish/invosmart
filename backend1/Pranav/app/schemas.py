from datetime import date
from typing import List, Optional
from pydantic import BaseModel, Field, validator

# Base schema for line items
class LineItemBase(BaseModel):
    description: str = Field(..., example="Product XYZ")
    unit_price: float = Field(..., example=100.0)
    quantity: int = Field(..., example=2)
    amount: float = Field(..., example=200.0)

    @validator("amount")
    def validate_amount(cls, v, values):
        if "unit_price" in values and "quantity" in values:
            calculated_amount = values["unit_price"] * values["quantity"]
            if abs(v - calculated_amount) > 0.01:  # Allow small floating-point differences
                raise ValueError("Amount must match unit_price * quantity")
        return v

# Base schema for invoice information
# class InvoiceInfoBase(BaseModel):
#     number: str = Field(..., example="INV-12345")
#     date: date = Field(..., example="2023-10-01")  # ✅ Correct
#     due_date: date = Field(..., example="2023-10-15")

    po_number: Optional[str] = Field(None, example="PO-67890")

# Base schema for address
class AddressBase(BaseModel):
    name: str = Field(..., example="John Doe")
    address_lines: List[str] = Field(..., example=["123 Main St", "Suite 456", "Springfield, IL 62701"])

# Base schema for invoice summary
class InvoiceSummaryBase(BaseModel):
    subtotal: float = Field(..., example=1000.0)
    tax_rate: float = Field(..., example=0.07)
    tax_amount: float = Field(..., example=70.0)
    total: float = Field(..., example=1070.0)

    @validator("tax_amount")
    def validate_tax_amount(cls, v, values):
        if "subtotal" in values and "tax_rate" in values:
            calculated_tax = values["subtotal"] * values["tax_rate"]
            if abs(v - calculated_tax) > 0.01:  # Allow small floating-point differences
                raise ValueError("tax_amount must match subtotal * tax_rate")
        return v

    @validator("total")
    def validate_total(cls, v, values):
        if "subtotal" in values and "tax_amount" in values:
            calculated_total = values["subtotal"] + values["tax_amount"]
            if abs(v - calculated_total) > 0.01:  # Allow small floating-point differences
                raise ValueError("total must match subtotal + tax_amount")
        return v

# Schema for creating an invoice
class InvoiceCreate(BaseModel):
    # invoice_info: InvoiceInfoBase
    bill_to: AddressBase
    ship_to: AddressBase
    line_items: List[LineItemBase]
    summary: InvoiceSummaryBase

# Schema for responding with an invoice
class InvoiceResponse(BaseModel):
    id: int
    original_filename: str
    ocr_json: dict
    validation_status: str
    created_at: date
    updated_at: date

    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy models

# Schema for validating purchase orders
class PurchaseOrderBase(BaseModel):
    po_number: str = Field(..., example="PO-67890")
    total_amount: float = Field(..., example=1000.0)

# Schema for validating GRNs (Goods Received Notes)
class GRNBase(BaseModel):
    po_number: str = Field(..., example="PO-67890")
    quantity: int = Field(..., example=10)

# Schema for invoice validation result
class InvoiceValidationResult(BaseModel):
    status: str = Field(..., example="validated")
    details: Optional[dict] = Field(None, example={"po_match": True, "grn_match": True})