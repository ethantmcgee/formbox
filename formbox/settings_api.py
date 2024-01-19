import enum

from ninja import Schema


class ChangeEmailState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE"


class ChangePasswordState(str, enum.Enum):
    SUCCESS = "SUCCESS"
    CURRENT_PASSWORD_INCORRECT = "CURRENT_PASSWORD_INCORRECT"
    NEW_PASSWORD_INSECURE = "NEW_PASSWORD_INSECURE"


class ChangeEmailRequest(Schema):
    newEmail: str = None


class ChangeEmailResponse(Schema):
    status: ChangeEmailState = None


class ChangePasswordRequest(Schema):
    currentPassword: str = None
    newPassword: str = None


class ChangePasswordResponse(Schema):
    status: ChangePasswordState = None
