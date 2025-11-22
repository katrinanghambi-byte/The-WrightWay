from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .models import *  # Imports all models

app = FastAPI(title="The Wright Way API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)  # Creates tables in DB

@app.get("/")
def read_root():
    return {"message": "The Wright Way API is running!"}