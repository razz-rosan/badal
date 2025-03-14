from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Hospital schemas
class HospitalBase(BaseModel):
    name: str

class HospitalCreate(HospitalBase):
    password: str

class Hospital(HospitalBase):
    id: int
    
    class Config:
        from_attributes = True

# Patient schemas
class PatientBase(BaseModel):
    name: str
    age: int
    gender: str
    existing_diseases: Optional[str] = None
    disease_diagnosed: Optional[str] = None

class PatientCreate(PatientBase):
    hospital_id: int

class Patient(PatientBase):
    id: int
    hospital_id: int
    
    class Config:
        from_attributes = True

# Scan schemas
class ScanBase(BaseModel):
    about: str
    
class ScanCreate(ScanBase):
    patient_id: int

class Scan(ScanBase):
    id: int
    date_uploaded: datetime
    file_path: str
    patient_id: int
    
    class Config:
        from_attributes = True

# Genetic Data schemas
class GeneticDataBase(BaseModel):
    pass

class GeneticDataCreate(GeneticDataBase):
    patient_id: int

class GeneticData(GeneticDataBase):
    id: int
    file_path: str
    upload_date: datetime
    patient_id: int
    
    class Config:
        from_attributes = True

# Researcher schemas
class ResearcherBase(BaseModel):
    name: str
    purpose: str

class ResearcherCreate(ResearcherBase):
    password: str

class Researcher(ResearcherBase):
    id: int
    
    class Config:
        from_attributes = True
