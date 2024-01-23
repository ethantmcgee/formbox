from typing import List

from ninja import Schema


class ApiUser(Schema):
    id: int = None
    username: str = None
    email: str = None


class PageableApiUser(Schema):
    total: int = None
    results: List[ApiUser] = None