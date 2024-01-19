from os import getenv
from twilio.rest import Client

client = Client(getenv('TWILIO_SID'), getenv('TWILIO_AUTH_KEY'))
service = getenv('TWILIO_VERIFY_ID')

def start_verification(to):
    verification = client.verify \
        .services(service) \
        .verifications \
        .create(to=to, channel='sms')

    return verification.sid


def check_verification(phone, code):
    verification_check = client.verify \
        .services(service) \
        .verification_checks \
        .create(to=phone, code=code)

    if verification_check.status == "approved":
        return True
    else:
        return False
