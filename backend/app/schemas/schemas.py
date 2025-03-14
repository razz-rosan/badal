from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class HospitalBase(BaseModel):
    name: str
    password: str

class HospitalCreate(HospitalBase):
    pass

class HospitalOut(HospitalBase):
    id: int
    class Config:
        from_attributes = True

class PatientBase(BaseModel):
    name: str
    age: int
    gender: str
    existing_diseases: Optional[str] = None
    disease_diagnosed: Optional[str] = None
    scan_details: Optional[Dict] = None
    genetic_data: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientOut(PatientBase):
    id: int
    class Config:
        from_attributes = True

class ResearcherBase(BaseModel):
    name: str
    password: str
    purpose: Optional[str] = None

class ResearcherCreate(ResearcherBase):
    pass

class ResearcherOut(ResearcherBase):
    id: int
    class Config:
        from_attributes = True
