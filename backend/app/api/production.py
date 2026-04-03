from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import ProductionRecord
from ..schemas import ProductionRecordCreate, ProductionRecordResponse

router = APIRouter(prefix="/production", tags=["Production"])

def get_record(db: Session, lot: str):
    return db.query(ProductionRecord).filter(ProductionRecord.lot_interne == lot).first()

@router.post("/draft", response_model=ProductionRecordResponse)
def save_draft(payload: ProductionRecordCreate, db: Session = Depends(get_db)):
    existing = get_record(db, payload.lot_interne)
    if existing:
        for key, value in payload.model_dump().items():
            setattr(existing, key, value)
        existing.status = "DRAFT"
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        return existing
    
    new_record = ProductionRecord(**payload.model_dump(), status="DRAFT")
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@router.post("/submit", response_model=ProductionRecordResponse)
def submit_sheet(payload: ProductionRecordCreate, db: Session = Depends(get_db)):
    existing = get_record(db, payload.lot_interne)
    if existing:
        for key, value in payload.model_dump().items():
            setattr(existing, key, value)
        existing.status = "VALIDATED"
        existing.validated_at = datetime.utcnow()
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        return existing
    
    new_record = ProductionRecord(**payload.model_dump(), status="VALIDATED", validated_at=datetime.utcnow())
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@router.get("/{lot_id}", response_model=ProductionRecordResponse)
def get_sheet(lot_id: str, db: Session = Depends(get_db)):
    record = get_record(db, lot_id)
    if not record:
        raise HTTPException(status_code=404, detail="Fiche non trouvée")
    return record
