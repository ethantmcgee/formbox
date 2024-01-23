import enum
from typing import List

from ninja import Schema


class AuthenticationState(str, enum.Enum):
    MFA_NEEDED = "MFA_NEEDED"
    PASSWORD_CHANGE_REQUIRED = "PASSWORD_CHANGE_REQUIRED"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"


class MFAType(str, enum.Enum):
    TOTP = 'TOTP'
    SMS = 'SMS'
    EMAIL = 'EMAIL'


class ChangePasswordRequest(Schema):
    email: str = None


class ChangePasswordResponse(Schema):
    state: AuthenticationState = None


class LoginRequest(Schema):
    username: str = None
    password: str = None


class GetMFAOptionsRequest(Schema):
    twoFactorAuthToken: str = None


class MFAOption(Schema):
    id: int = None
    type: MFAType = None
    nickname: str = None
    preview: str = None


class StartMFARequest(Schema):
    twoFactorAuthToken: str = None
    twoFactorMethod: int = None


class StartMFAResponse(Schema):
    state: AuthenticationState = None


class CompleteMFARequest(Schema):
    twoFactorAuthToken: str = None
    twoFactorMethod: int = None
    code: str = None


class StartChangePasswordRequest(Schema):
    passwordResetToken: str = None


class CompleteChangePasswordRequest(Schema):
    passwordResetToken: str = None
    currentPassword: str = None
    newPassword: str = None


class LoginResponse(Schema):
    state: AuthenticationState = None
    passwordResetToken: str = None
    twoFactorAuthToken: str = None
    authToken: str = None
    refreshToken: str = None
