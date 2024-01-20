from os import getenv
from twilio.rest import Client

client = Client(getenv('TWILIO_SID', 'NOT_ENABLED'), getenv('TWILIO_AUTH_KEY', 'NOT_ENABLED'))
service = getenv('TWILIO_VERIFY_ID', 'NOT_ENABLED')

def start_verification(to):
    verification = client.verify \
        .services(service) \
        .verifications \
        .create(to=to if to.startswith("+") else "+1" + to, channel='sms')

    return verification.sid


def check_verification(to, code):
    verification_check = client.verify \
        .services(service) \
        .verification_checks \
        .create(to=to if to.startswith("+") else "+1" + to, code=code)

    if verification_check.status == "approved":
        return True
    else:
        return False
