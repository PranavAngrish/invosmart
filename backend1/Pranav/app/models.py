from datetime import datetime  # Import datetime module
from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    original_filename = Column(String)
    ocr_json = Column(JSON)
    validation_status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)  # Use datetime.utcnow
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    po_id = Column(Integer, ForeignKey('purchase_orders.id'))
    grn_id = Column(Integer, ForeignKey('grns.id'))

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True, index=True)
    po_number = Column(String, unique=True)
    total_amount = Column(Integer)
    # Add other PO fields

class GRN(Base):
    __tablename__ = "grns"

    id = Column(Integer, primary_key=True, index=True)
    po_number = Column(String)
    quantity = Column(Integer)
    # Add other GRN fields