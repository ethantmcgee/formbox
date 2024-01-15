from ninja import Router
from formbox.auth_api import *

router = Router()


@router.post("/request-password-change", response=ChangePasswordResponse)
def request_password_change(request, data: ChangePasswordResponse):
    pass


@router.post("/login", response=LoginResponse)
def login(request, data: LoginRequest):
    pass


@router.post("/get-mfa-options", response=GetMFAOptionsResponse)
def get_mfa_options(request, data: GetMFAOptionsRequest):
    pass


@router.post("/start-mfa", response=StartMFAResponse)
def start_mfa(request, data: StartMFARequest):
    pass


@router.post("/complete-mfa", response=LoginResponse)
def complete_mfa(request, data: CompleteMFARequest):
    pass


@router.post("/start-change-password", response=LoginResponse)
def start_change_password(request, data: StartChangePasswordRequest):
    pass


@router.post("/complete-change-password", response=LoginResponse)
def complete_change_password(request, data: CompleteChangePasswordRequest):
    pass
