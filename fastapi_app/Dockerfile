FROM python

WORKDIR ./fastapi_app

COPY . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /fastapi_app/wait-for-it.sh

RUN chmod +x /fastapi_app/wait-for-it.sh

RUN pip install --upgrade pip

RUN pip install 'fastapi[all]' 'sqlalchemy[all]' pydantic starlette mysql-connector-python 






