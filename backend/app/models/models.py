from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Hospital(Base):
    __tablename__ = "hospitals"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    password = Column(String)
    
    patients = relationship("Patient", back_populates="hospital")

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    gender = Column(String)
    existing_diseases = Column(String)
    disease_diagnosed = Column(String)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    
    hospital = relationship("Hospital", back_populates="patients")
    scans = relationship("Scan", back_populates="patient")
    genetic_data = relationship("GeneticData", back_populates="patient")

class Scan(Base):
    __tablename__ = "scans"
    
    id = Column(Integer, primary_key=True, index=True)
    about = Column(Text)
    date_uploaded = Column(DateTime, default=datetime.datetime.utcnow)
    file_path = Column(String)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    
    patient = relationship("Patient", back_populates="scans")

class GeneticData(Base):
    __tablename__ = "genetic_data"
    
    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String)
    upload_date = Column(DateTime, default=datetime.datetime.utcnow)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    
    patient = relationship("Patient", back_populates="genetic_data")

class Researcher(Base):
    __tablename__ = "researchers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    password = Column(String)
    purpose = Column(Text)
