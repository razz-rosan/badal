from fastapi import APIRouter
from .hospitals import router as hospitals_router
from .patients import router as patients_router
from .researchers import router as researchers_router

router = APIRouter()

router.include_router(hospitals_router, prefix="/hospitals", tags=["hospitals"])
router.include_router(patients_router, prefix="/patients", tags=["patients"])
router.include_router(researchers_router, prefix="/researchers", tags=["researchers"])
