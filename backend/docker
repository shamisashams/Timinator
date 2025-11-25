
FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

# COPY ./backend/requirements.txt .

# Copy the application files
COPY requirements.txt /app/


# COPY requirements.txt .

# Install the required dependencies with verbose output
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]