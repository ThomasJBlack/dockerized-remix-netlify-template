FROM python

COPY . /snyking
WORKDIR /snyking

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 3000

CMD ["uvicorn", "fastapi_backend:app", "--reload", "--host", "0.0.0.0", "--port", "3000"]