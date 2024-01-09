from django.contrib.auth.models import User
from django.db import models


PROTECTION_TYPE = [
    ('NONE', 'None'),
    ('HCAPTCHA', 'hCaptcha'),
    ('RECAPTCHA', 'Re-Captcha')
]

NOTIFICATION_TYPE = [
    ('NONE', 'None'),
    ('IMMEDIATE', 'Immediate'),
    ('DIGEST', 'Digest')
]

DAY_PART = [
    ('AM', 'AM'),
    ('PM', 'PM')
]


class Team(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(User)


class Project(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    protection = models.CharField(max_length=10, choices=PROTECTION_TYPE)
    protection_key = models.CharField(max_length=255, null=True)
    notification = models.CharField(max_length=10, choices=NOTIFICATION_TYPE)
    digest_time = models.IntegerField(null=True)
    digest_day_part = models.CharField(max_length=3, choices=DAY_PART, null=True)


class ProjectNotification(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    email = models.CharField(max_length=255)


class ProjectSubmission(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    submission = models.JSONField()