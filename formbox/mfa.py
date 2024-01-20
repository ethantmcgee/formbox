from django.contrib.auth.models import User

from formbox.models import TwoFactorOption


def send_mfa(user: User, mfa: TwoFactorOption):
    pass


def validate_mfa(user: User, mfa: TwoFactorOption, code: str) -> bool:
    pass