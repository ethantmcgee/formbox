from django.core.paginator import Paginator, EmptyPage
from django.db.models import Q
from django.views.decorators.cache import never_cache
from ninja import Router
from ninja_jwt.authentication import JWTAuth
from django.utils import timezone
from uuid import uuid4
from os import getenv

from formbox.models import Form
from formbox.mail import send_email
from formbox.settings_api import CheckAvailabilityResponse
from formbox.form_api import ApiForm, PageableApiForm

router = Router()


@never_cache
@router.get("/", response=PageableApiForm, auth=JWTAuth())
def list_users(request, search: str = "", page: int = 1, itemsPerPage: int = 10):
    forms = Form.objects
    if search != "":
        forms = forms.filter(Q(name__icontains=search) | Q(slug__icontains=search))
    paginator = Paginator(forms.order_by("name"), itemsPerPage)
    try:
        page = paginator.page(page)
        return {"total": forms.count(), "results": [{"id": x.id, "name": x.name, "slug": x.slug} for x in list(page.object_list)]}
    except EmptyPage:
        return {"total": forms.count(), "results": []}


@never_cache
@router.get("/{id}", response=ApiForm, auth=JWTAuth())
def get_user(request, id: int):
    form = Form.objects.get(id=id)
    return {"id": form.id, "name": form.name, "slug": form.slug}


@never_cache
@router.post("/", response=ApiForm, auth=JWTAuth())
def create_user(request, data: ApiForm):
    form = Form.objects.create(name=data.name, slug=data.slug)
    form.save()
    return {"id": form.id, "name": form.name, "slug": form.slug}


@never_cache
@router.put("/", response=ApiForm, auth=JWTAuth())
def update_user(request, data: ApiForm):
    form = Form.objects.get(id=data.id)
    form.name = data.name
    form.slug = data.slug
    form.save()
    return {"id": form.id, "name": form.name, "slug": form.slug}


@never_cache
@router.delete("/", response=bool, auth=JWTAuth())
def update_user(request, data: ApiForm):
    Form.objects.get(id=data.id).delete()
    return True


@never_cache
@router.get("/check-name/{id}/{name}", response=CheckAvailabilityResponse, auth=JWTAuth())
def check_username(request, id: int, name: str):
    count = Form.objects.exclude(id=id).filter(name=name).count()
    return {"available": count == 0}


@never_cache
@router.get("/check-slug/{id}/{slug}", response=CheckAvailabilityResponse, auth=JWTAuth())
def check_email(request, id: int, slug: str):
    count = Form.objects.exclude(id=id).filter(slug=slug).count()
    return {"available": count == 0}