import enum

from ninja import Schema


class GetUserResponse(Schema):
    id: int = None
    username: str = None
    email: str = None


class CheckAvailabilityResponse(Schema):
    available: bool = None


class ChangeUsernameState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    USERNAME_ALREADY_IN_USE = "USERNAME_ALREADY_IN_USE"


class ChangeEmailState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE"


class TwoFactorType(str, enum.Enum):
    TOTP = "TOTP"
    SMS = "SMS"
    EMAIL = "EMAIL"


class DeleteTwoFactorState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"


class TwoFactorSaveState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    SMS_NOT_ENABLED = "SMS_NOT_ENABLED"
    CODE_INCORRECT = "CODE_INCORRECT"
    CANNOT_UPDATE = "CANNOT_UPDATE"


class ChangePasswordState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    CURRENT_PASSWORD_INCORRECT = "CURRENT_PASSWORD_INCORRECT"
    NEW_PASSWORD_INSECURE = "NEW_PASSWORD_INSECURE"


class ChangeUsernameRequest(Schema):
    newUsername: str = None


class ChangeUsernameResponse(Schema):
    state: ChangeUsernameState = None


class ChangeEmailRequest(Schema):
    newEmail: str = None


class ChangeEmailResponse(Schema):
    state: ChangeEmailState = None


class ChangePasswordRequest(Schema):
    currentPassword: str = None
    newPassword: str = None


class ChangePasswordResponse(Schema):
    state: ChangePasswordState = None


class TwoFactor(Schema):
    id: int = None
    nickname: str = None
    target: str = None
    secret: str = None
    twoFactorType: TwoFactorType = None
    active: bool = None
    code: str = None
    state: TwoFactorSaveState = None


class DeleteTwoFactorResponse(Schema):
    state: DeleteTwoFactorState = None
