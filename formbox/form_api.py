import enum
from typing import List

from ninja import Schema


class ProtectionType(str, enum.Enum):
    NONE = "NONE"
    HCAPTCHA = "HCAPTCHA"
    RECAPTCHA = "Re-RECAPTCHA"


class NotificationType(str, enum.Enum):
    NONE = "NONE"
    IMMEDIATE = "IMMEDIATE"
    DIGEST = "DIGEST"


class DayPart(str, enum.Enum):
    AM = "AM"
    PM = "PM"


class ApiForm(Schema):
    id: int = None
    name: str = None
    slug: str = None
    protection: ProtectionType = None
    protectionKey: str = None
    notification: NotificationType = None
    digestTime: int = None
    digestDayPart: DayPart = None
    domains: str = None
    notifications: str = None


class PageableApiForm(Schema):
    total: int = None
    results: List[ApiForm] = None