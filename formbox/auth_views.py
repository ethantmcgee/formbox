from ninja import Router
from .auth_api import *

router = Router()


@router.post("/request-password-change", response=ChangePasswordResponse)
def register(request, data: ChangePasswordResponse):
    pass


@router.post("/login", response=LoginResponse)
def register(request, data: LoginRequest):
    pass


@router.post("/get-mfa-options", response=GetMFAOptionsResponse)
def register(request, data: GetMFAOptionsRequest):
    pass


@router.post("/start-mfa", response=StartMFAResponse)
def register(request, data: StartMFARequest):
    pass


@router.post("/complete-mfa", response=LoginResponse)
def register(request, data: CompleteMFARequest):
    pass


@router.post("/change-password", response=LoginResponse)
def register(request, data: CompleteMFARequest):
    pass