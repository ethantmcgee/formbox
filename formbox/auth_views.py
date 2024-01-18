from django.contrib.auth import authenticate
from django.views.decorators.cache import never_cache
from ninja import Router
from ninja_jwt.tokens import RefreshToken

from formbox.auth_api import *

router = Router()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@never_cache
@router.post("/request-password-change", response=ChangePasswordResponse)
def request_password_change(request, data: ChangePasswordResponse):
    pass


@never_cache
@router.post("/login", response=LoginResponse)
def login(request, data: LoginRequest):
    user = authenticate(username=data.username, password=data.password)
    if user:
        tokens = get_tokens_for_user(user)
        return {"state": AuthenticationState.SUCCESS, "authToken": tokens['access'], "refreshToken": tokens['refresh']}
    else:
        return {"state": AuthenticationState.FAILED}


@never_cache
@router.post("/get-mfa-options", response=GetMFAOptionsResponse)
def get_mfa_options(request, data: GetMFAOptionsRequest):
    pass


@never_cache
@router.post("/start-mfa", response=StartMFAResponse)
def start_mfa(request, data: StartMFARequest):
    pass


@never_cache
@router.post("/complete-mfa", response=LoginResponse)
def complete_mfa(request, data: CompleteMFARequest):
    pass


@never_cache
@router.post("/start-change-password", response=LoginResponse)
def start_change_password(request, data: StartChangePasswordRequest):
    pass


@never_cache
@router.post("/complete-change-password", response=LoginResponse)
def complete_change_password(request, data: CompleteChangePasswordRequest):
    pass
