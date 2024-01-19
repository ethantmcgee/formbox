from django.views.decorators.cache import never_cache
from ninja import Router
from ninja_jwt.authentication import JWTAuth

from formbox.settings_api import *

router = Router()


@never_cache
@router.post("/email-change", response=ChangeEmailResponse, auth=JWTAuth())
def password_change(request, data: ChangeEmailRequest):
    return {"status": ChangeEmailState.SUCCESS}


@never_cache
@router.post("/password-change", response=ChangePasswordResponse, auth=JWTAuth())
def password_change(request, data: ChangePasswordRequest):
    return {"status": ChangePasswordState.SUCCESS}
