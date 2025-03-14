from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..models.schemas import Researcher, ResearcherCreate
from ..models.models import Researcher as ResearcherModel
from ..config import get_db

router = APIRouter()

@router.post("/", response_model=Researcher)
def create_researcher(researcher: ResearcherCreate, db: Session = Depends(get_db)):
    db_researcher = ResearcherModel(**researcher.dict())
    db.add(db_researcher)
    db.commit()
    db.refresh(db_researcher)
    return db_researcher

@router.get("/", response_model=List[Researcher])
def read_researchers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    researchers = db.query(ResearcherModel).offset(skip).limit(limit).all()
    return researchers

@router.get("/{researcher_id}", response_model=Researcher)
def read_researcher(researcher_id: int, db: Session = Depends(get_db)):
    db_researcher = db.query(ResearcherModel).filter(ResearcherModel.id == researcher_id).first()
    if db_researcher is None:
        raise HTTPException(status_code=404, detail="Researcher not found")
    return db_researcher
