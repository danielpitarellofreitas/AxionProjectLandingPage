import os

import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field


class Lead(BaseModel):
  name: str = Field(min_length=2, max_length=255)
  email: EmailStr = Field(min_length=6, max_length=254)
  business: str | None = Field(max_length=150) 
  phone: str | None = Field(max_length=11)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://localhost"
  ],
  
  allow_methods=["*"],
  allow_headers=["*"]
)

load_dotenv()
DATABASE_URL = os.environ.get("DATABASE_URL")

@app.get("/")
def root():
  return {'message': 'Hello! why you want here?'}

@app.post("/save-lead")
def save_lead(lead: Lead):
  
  try:
    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cursor:
      cursor.execute(
      """
        INSERT INTO leads (name, email, business, phone) 
        VALUES (%s, %s, %s, %s)
      """, (lead.name, lead.email, lead.business, lead.phone))

    return {"message": f"Lead {lead.name} has been saved!"}

  except psycopg.OperationalError as dbError:
    return {'message': str(dbError)}
  
