import datetime

from django.contrib.auth import authenticate
from django.views.decorators.cache import never_cache
from ninja import Router
from ninja_jwt.tokens import RefreshToken
from uuid import uuid4

from formbox.auth_api import *
from formbox.models import TwoFactorOption

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
        if TwoFactorOption.objects.filter(user=user).exists():
            user.authsetting.two_factor_auth_token = str(uuid4())
            user.authsetting.two_factor_auth_token_created = datetime.datetime.now()
            user.save()
            return {"state": AuthenticationState.MFA_NEEDED, "twoFactorAuthToken": user.authsetting.two_factor_auth_token}
        elif user.authsetting.needs_password_change:
            user.authsetting.password_reset_token = str(uuid4())
            user.authsetting.password_reset_token_created = datetime.datetime.now()
            user.save()
            return {"state": AuthenticationState.PASSWORD_CHANGE_REQUIRED, "passwordResetToken": user.authsetting.password_reset_token}
        else:
            tokens = get_tokens_for_user(user)
            return {"state": AuthenticationState.SUCCESS, "authToken": tokens['access'], "refreshToken": tokens['refresh']}
    else:
        return {"state": AuthenticationState.FAILED}


@never_cache
@router.post("/get-mfa-options", response=List[MFAOption])
def get_mfa_options(request, data: GetMFAOptionsRequest):

    options = TwoFactorOption.objects.filter(user=request.user, active=True).all()
    return [{
        "id": option.id,
        "nickname": option.nickname,
        "twoFactorType": option.two_factor_type,
        "target": option.get_masked_target()
    } for option in options]


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
