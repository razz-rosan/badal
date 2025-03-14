from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from datetime import datetime

from ..models.schemas import Patient, PatientCreate, Scan, ScanCreate, GeneticData, GeneticDataCreate
from ..models.models import Patient as PatientModel, Scan as ScanModel, GeneticData as GeneticDataModel
from ..config import get_db

router = APIRouter()

@router.post("/", response_model=Patient)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    db_patient = PatientModel(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.get("/", response_model=List[Patient])
def read_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    patients = db.query(PatientModel).offset(skip).limit(limit).all()
    return patients

@router.get("/{patient_id}", response_model=Patient)
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@router.post("/{patient_id}/scans", response_model=Scan)
def create_patient_scan(
    patient_id: int, 
    about: str,
    scan_file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    # Verify patient exists
    db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Save file
    file_location = f"uploads/scans/{patient_id}_{scan_file.filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(scan_file.file, buffer)
    
    # Create scan record
    db_scan = ScanModel(
        about=about,
        file_path=file_location,
        patient_id=patient_id
    )
    db.add(db_scan)
    db.commit()
    db.refresh(db_scan)
    return db_scan

@router.post("/{patient_id}/genetic-data", response_model=GeneticData)
def upload_genetic_data(
    patient_id: int,
    genetic_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Verify patient exists
    db_patient = db.query(PatientModel).filter(PatientModel.id == patient_id).first()
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Save file
    file_location = f"uploads/genetic/{patient_id}_{genetic_file.filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(genetic_file.file, buffer)
    
    # Create genetic data record
    db_genetic = GeneticDataModel(
        file_path=file_location,
        patient_id=patient_id
    )
    db.add(db_genetic)
    db.commit()
    db.refresh(db_genetic)
    return db_genetic
