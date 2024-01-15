from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

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

TWO_FACTOR_TYPE = [
    ('TOTP', 'Time-Based One Time Password'),
    ('SMS', 'SMS'),
    ('EMAIL', 'E-mail'),
]


class AuthSetting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password_reset_token = models.CharField(max_length=255, null=True)
    password_reset_token_created = models.DateTimeField(null=True)
    two_factor_auth_token = models.CharField(max_length=255, null=True)
    two_factor_auth_token_created = models.DateTimeField(null=True)
    invite_token = models.CharField(max_length=255, null=True)
    invite_token_created = models.DateTimeField(null=True)


@receiver(post_save, sender=User)
def create_user_auth_setting(sender, instance, created, **kwargs):
    if created:
        AuthSetting.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_auth_setting(sender, instance, **kwargs):
    instance.authsetting.save()


class TwoFactorOption(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    two_factor_type = models.CharField(max_length=6, choices=TWO_FACTOR_TYPE)
    target = models.CharField(max_length=255, null=True)
    secret = models.CharField(max_length=255, null=True)
    nickname = models.CharField(max_length=255, null=True)


class Team(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(User)


class TeamInvite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    invitee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invitee_id')
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invited_by_id')


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