from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.config import get_db
from backend.app.models import models
from backend.app.schemas import schemas

router = APIRouter()

@router.post("/hospitals/", response_model=schemas.HospitalOut)
def create_hospital(hospital: schemas.HospitalCreate, db: Session = Depends(get_db)):
    db_hospital = models.Hospital(name=hospital.name, password=hospital.password)
    db.add(db_hospital)
    db.commit()
    db.refresh(db_hospital)
    return db_hospital

@router.post("/patients/", response_model=schemas.PatientOut)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.post("/researchers/", response_model=schemas.ResearcherOut)
def create_researcher(researcher: schemas.ResearcherCreate, db: Session = Depends(get_db)):
    db_researcher = models.Researcher(**researcher.dict())
    db.add(db_researcher)
    db.commit()
    db.refresh(db_researcher)
    return db_researcher
