FROM node:18-alpine as builder

COPY frontend/ /frontend

WORKDIR /frontend

RUN npm install
RUN npm run build

FROM nginx:alpine as runner

RUN apk add py3-pip

COPY --from=builder /frontend/build /frontend

COPY formbox/ /backend/formbox
COPY mysite/ /backend/mysite
COPY manage.py /backend
COPY requirements.txt /backend

COPY start.sh /start.sh

COPY default-prod.conf /etc/nginx/conf.d/default.conf

WORKDIR /backend

RUN pip3 install -r requirements.txt

WORKDIR /

RUN chmod +x start.sh

CMD /start.sh
