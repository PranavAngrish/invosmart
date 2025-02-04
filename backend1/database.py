from sqlalchemy import Column, Integer, String, DateTime, JSON, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    _tablename_ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    invoices = relationship("Invoice", back_populates="user")

class Invoice(Base):
    _tablename_ = 'invoices'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    ocr_json = Column(JSON)
    original_filename = Column(String)
    extracted_at = Column(DateTime, default=datetime.utcnow)
    validation_status = Column(String)  # e.g., 'validated', 'partial_match', 'no_match'
    user = relationship("User", back_populates="invoices")

class GRN(Base):
    _tablename_ = 'goods_receipt_notes'
    
    id = Column(Integer, primary_key=True, index=True)
    po_number = Column(String)
    description = Column(String)
    quantity = Column(Integer)
    received_date = Column(DateTime)

class PurchaseOrder(Base):
    _tablename_ = 'purchase_orders'
    
    id = Column(Integer, primary_key=True, index=True)
    po_number = Column(String, unique=True)
    vendor = Column(String)
    total_amount = Column(Float)
    created_date = Column(DateTime)