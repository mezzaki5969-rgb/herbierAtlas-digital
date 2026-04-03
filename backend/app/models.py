from sqlalchemy import Column, Integer, String, DateTime, JSON, func
from .database import Base

class ProductionRecord(Base):
    __tablename__ = "production_records"

    id = Column(Integer, primary_key=True, index=True)
    lot_interne = Column(String(50), unique=True, index=True, nullable=False)
    product_code = Column(String(50), nullable=False)
    production_date = Column(DateTime, nullable=False)
    team = Column(String(10), nullable=False)
    responsible = Column(String(100), nullable=False)
    
    # Statut & Audit Trail (Conformité FSSC 22000)
    status = Column(String(20), default="DRAFT")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    validated_at = Column(DateTime(timezone=True), nullable=True)
    
    # Données dynamiques (JSON natif MySQL 5.7+)
    step_data = Column(JSON, nullable=False)
    mdo_data = Column(JSON, nullable=False)
    observations = Column(String(1000), nullable=True)
