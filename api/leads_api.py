import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

import os

class Lead(BaseModel):
  name: str
  email: str
  business: str | None = None
  phone: str | None = None

app = FastAPI()

load_dotenv()
DATABASE_URL = os.environ.get("DATABASE_URL")

@app.get("/")
def root():
  return {'message': 'Hello! why you want here?'}

@app.post("/save-lead")
def save_lead(lead: Lead):
  try:
    with psycopg.connect(DATABASE_URL) as conn:
      with conn.cursor() as cursor:
        cursor.execute(
        """
          INSERT INTO leads (name, email, business, phone) 
          VALUES (%s, %s, %s, %s)
        """, (lead.name, lead.email, lead.business, lead.phone))

    return {"message": f"Lead {lead.name} has been saved!"}

  except psycopg.OperationalError as dbError:
    return {'message': str(dbError)}