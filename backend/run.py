import uvicorn
from fastapi import FastAPI
from app.routes import router
from app.models.models import Base
from app.config import engine

# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Badal Healthcare API")

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
