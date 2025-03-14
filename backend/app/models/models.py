from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.config import Base  # Importing Base from config

class Hospital(Base):
    __tablename__ = "hospitals"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    existing_diseases = Column(Text, nullable=True)
    disease_diagnosed = Column(Text, nullable=True)
    scan_details = Column(JSON, nullable=True)  # Stores details about scans
    genetic_data = Column(String, nullable=True)  # Path to the genetic data file

class Researcher(Base):
    __tablename__ = "researchers"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    purpose = Column(Text, nullable=True)
