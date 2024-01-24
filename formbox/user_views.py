from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Q
from django.views.decorators.cache import never_cache
from ninja import Router
from ninja_jwt.authentication import JWTAuth
from django.utils import timezone
from uuid import uuid4
from os import getenv

from formbox.mail import send_email
from formbox.user_api import ApiUser, PageableApiUser

router = Router()


@never_cache
@router.get("/", response=PageableApiUser, auth=JWTAuth())
def list_users(request, search: str = "", page: int = 1, itemsPerPage: int = 10):
    users = User.objects
    if search != "":
        users = users.filter(Q(username__icontains=search) | Q(email__icontains=search))
    paginator = Paginator(users.order_by("email"), itemsPerPage)
    try:
        page = paginator.page(page)
        return {"total": users.count(), "results": [{"id": x.id, "email": x.email, "username": x.username} for x in list(page.object_list)]}
    except EmptyPage:
        return {"total": users.count(), "results": []}


@never_cache
@router.get("/{id}", response=ApiUser, auth=JWTAuth())
def get_user(request, id: int):
    user = User.objects.get(id=id)
    return {"id": user.id, "email": user.email, "username": user.username}


@never_cache
@router.get("/{id}/force-password-reset", response=ApiUser, auth=JWTAuth())
def get_user(request, id: int):
    user = User.objects.get(id=id)
    user.authsetting.needs_password_change = True
    user.save()
    return {"id": user.id, "email": user.email, "username": user.username}


@never_cache
@router.post("/", response=ApiUser, auth=JWTAuth())
def create_user(request, data: ApiUser):
    user = User.objects.create(email=data.email, username=data.username)
    user.authsetting.needs_password_change = True
    user.authsetting.password_reset_token = str(uuid4())
    user.authsetting.password_reset_token_created = timezone.now()
    user.save()
    send_email(user.email, "Welcome to Formbox!", f"Welcome to Formbox!  You can set your password here: {getenv('HOST_PROTOCOL')}://{getenv('HOST')}/login?passwordChangeCode={user.authsetting.password_reset_token}.  This token is only valid for 5 minutes.")
    return {"id": user.id, "email": user.email, "username": user.username}


@never_cache
@router.put("/", response=ApiUser, auth=JWTAuth())
def update_user(request, data: ApiUser):
    user = User.objects.get(id=data.id)
    user.email = data.email
    user.username = data.username
    user.save()
    return {"id": user.id, "email": user.email, "username": user.username}


@never_cache
@router.delete("/", response=bool, auth=JWTAuth())
def update_user(request, data: ApiUser):
    User.objects.get(id=data.id).delete()
    return True