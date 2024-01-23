<p align="center">
  <picture>
    <img alt="formbox logo" width="400" src="docs/logo.png">
  </picture>
</p>
<p align="center">
 <strong>Capture form submissions on your own terms.</strong>
</p>

---

> Note: The project has not yet reached version 1.0.0 and is currently 
> in alpha stage at best.  Progress is on-going, v1.0.0 is expected in
> mid-February 2024.

## Overview

Formbox.dev is a self-hostable form submission backend for static
sites.  This allows you to take control of your form submissions.
Formbox is not a form generator.  You are expected to bring your
own form.  Integration for hCaptcha and Re-Captcha is provided for
spam protection.

## Features

- Unlimited Forms
- Unlimited Collaborators
- Unlimited Notifications
- Fully Self Hostable
- No Metric / Data Collection
- Bring Your Own SMTP
- Twilio Integration
- MFA
- hCaptcha / Re-Captcha Integration

## Setup

To host FormBox.dev, you'll need an SMTP provider (and if MFA via SMS
is desired, an active Twilio account).  The following docker compose
sample should get you up and going quickly, There are a couple env vars
you'll want to set or customize for security (these are marked as `???`
in the sample below).

| Environment Variable            | Purpose                                       | Valid Values    | Example                             |
|---------------------------------|-----------------------------------------------|-----------------|-------------------------------------|
| POSTGRES_USERNAME / DB_USERNAME | Username for the database                     | *any*           | username                            |
| POSTGRES_PASSWORD / DB_PASSWORD | Password for the database                     | *any*           | password                            |
| DB_HOST                         | Host of the database server                   | *any*           | db.host.com                         |
| DB_PORT                         | Port of the database server                   | *any*           | 5432                                |
| DB_NAME                         | Name of database on database server           | *any*           | formbox                             |
| SMTP_HOST                       | Host for SMTP server                          | *any*           | smtp.mailgun.org                    |
| SMTP_PORT                       | Port for SMTP server                          | *any*           | 587                                 |
| SMTP_TLS_ENABLED                | Whether to enable TLS in SMTP communication   | *True*, *False* | True                                |
| SMTP_USERNAME                   | Username for SMTP server                      | *any*           | username                            |
| SMTP_PASSWORD                   | Password for SMTP server                      | *any*           | password                            |
| SMTP_FROM                       | EMail to send from                            | *any*           | no-reply@formbox.dev                |
| SMS_ENABLED                     | Whether to enable SMS communications          | *True*, *False* | True                                |
| TWILIO_VERIFY_ID                | Verify Service Id in Twilio Account           | *any*           | VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |
| TWILIO_SID                      | SID of Twilio Account                         | *any*           | AC2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |
| TWILIO_AUTH_KEY                 | Twilio Auth Key                               | *any*           | 912XXXXXXXXXXXXXXXXXXXXXXXXXXXXX    |
| HOST                            | Host at which formbox is hosted               | *any*           | app.formbox.dev                     |
| HOST_PROTOCOL                   | Protocol used to host Formbox                 | *http*, *https* | https                               |
| CORS_HOSTS                      | Hosts to allow submissions from               | *any*           | site1.formbox.dev,site2.formbox.dev |
| SECRET_KEY                      | Used to hash passwords and secure secret data | *any*           | um8XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX |

```yaml
version: '3'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USERNAME: ???
      POSTGRES_PASSWORD: ???
      POSTGRES_DB: formbox
      PGDATA: /data/postgres
    volumes:
      - datavolume:/data/postgres
  redis:
    image: redis:6-alpine
  formbox:
    image: adagotech/formbox:latest
    environment:
      SMTP_HOST: ???
      SMTP_PORT: ???
      SMTP_TLS_ENABLED: ???
      SMTP_USERNAME: ???
      SMTP_PASSWORD: ???
      SMS_ENABLED: ???
      TWILIO_NUMBER: ???
      TWILIO_SID: ???
      TWILIO_AUTH_KEY: ???
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ???
      DB_PASSWORD: ???
      DB_NAME: formbox
      REDIS_HOST: redis
      REDIS_PORT: 6379
      HOST: ???
      HOST_PROTOCOL: ???
      CORS_HOSTS: ???
      SECRET_KEY: ???
      DEBUG: False
    ports:
      - "80:80"
volumes:
  datavolume:
```

Once the system boots, you can login by visiting "http://localhost",
and entering the default username / password of `admin` / `admin`.
This should be changed at first opportunity.  We also recommend each
user enable MFA (TOTP preferred) if this system will be hosted in a
publically accessible way.

## Trying Out

There are two ways to try FormBox.  You can either try the latest release
by cloning the repository then running:

```
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up
```

Or you can try the latest beta version with:

```
docker-compose -f docker-compose.yml -f docker-compose-beta.yml up
```

> No matter how you try, your emails will be sent to [http://localhost:1080](http://localhost:1080)

## Repository Contents

- `mysite` - contains settings and configuration for Django project
- `formbox` - contains backend api endpoint definitions for Django project
- `frontend` - contains frontend for Formbox.dev written in React
- `docs` - contains assets for the repository's `.md` files

## Contributions

This repository accepts community contributions. Please see our 
[Contribution Guidelines](CONTRIBUTING.md). Please abide by our 
[Code of Conduct](CODE_OF_CONDUCT.md) in all issues and discussions.  See our
[Development Guide](DEVELOPMENT.md) for more information about
getting setup.

## License

This repository and its contents are license under a MIT license.
For more details, see [LICENSE.md](LICENSE.md)
