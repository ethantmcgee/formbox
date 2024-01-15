import enum

from ninja import Schema


class AuthenticationState(str, enum.Enum):
    MFA_NEEDED = "MFA_NEEDED"
    PASSWORD_CHANGE_REQUIRED = "PASSWORD_CHANGE_REQUIRED"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"


class ChangePasswordRequest(Schema):
    email: str = None


class ChangePasswordResponse(Schema):
    state: AuthenticationState = None


class LoginRequest(Schema):
    username: str = None
    password: str = None


class GetMFAOptionsRequest(Schema):
    two_factor_auth_token: str = None


class GetMFAOptionsResponse(Schema):
    pass


class StartMFARequest(Schema):
    two_factor_auth_token: str = None
    two_factor_method: str = None


class StartMFAResponse(Schema):
    state: AuthenticationState = None


class CompleteMFARequest(Schema):
    two_factor_auth_token: str = None
    two_factor_method: str = None
    code: str = None


class AuthChangePasswordRequest(Schema):
    password_reset_token: str = None
    current_password: str = None
    new_password: str = None


class LoginResponse(Schema):
    state: AuthenticationState = None
    password_reset_token: str = None
    two_factor_auth_token: str = None
