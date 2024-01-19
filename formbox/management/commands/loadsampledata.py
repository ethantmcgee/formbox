from django.core.management.base import BaseCommand, CommandError
from formbox.models import User


class Command(BaseCommand):
    help = "adds sample data to database"

    def handle(self, *args, **options):
        if User.objects.count() == 0:
            User.objects.create_user(
                username="admin",
                password="admin",
                is_superuser=True
            )
            print("default admin user created")