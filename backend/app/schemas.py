from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime

class ProductionRecordBase(BaseModel):
    lot_interne: str
    product_code: str
    production_date: datetime
    team: str
    responsible: str
    step_data: Dict[str, Any]
    mdo_data: Dict[str, Any]
    observations: Optional[str] = None

class ProductionRecordCreate(ProductionRecordBase):
    status: str = "DRAFT"

class ProductionRecordResponse(ProductionRecordBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    validated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
