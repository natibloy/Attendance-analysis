FROM python:3.12-rc-alpine

WORKDIR /usr/src/app

COPY csv_files ./csv_files/
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY attendance.py .
COPY api.py .

CMD ["python3","api.py"]