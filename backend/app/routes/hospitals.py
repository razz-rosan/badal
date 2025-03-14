from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.models.schemas import Hospital, HospitalCreate

from ..models.models import Hospital as HospitalModel
from ..config import get_db

router = APIRouter()

@router.post("/", response_model=Hospital)
def create_hospital(hospital: HospitalCreate, db: Session = Depends(get_db)):
    db_hospital = HospitalModel(name=hospital.name, password=hospital.password)
    db.add(db_hospital)
    db.commit()
    db.refresh(db_hospital)
    return db_hospital

@router.get("/", response_model=List[Hospital])
def read_hospitals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    hospitals = db.query(HospitalModel).offset(skip).limit(limit).all()
    return hospitals

@router.get("/{hospital_id}", response_model=Hospital)
def read_hospital(hospital_id: int, db: Session = Depends(get_db)):
    db_hospital = db.query(HospitalModel).filter(HospitalModel.id == hospital_id).first()
    if db_hospital is None:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return db_hospital
