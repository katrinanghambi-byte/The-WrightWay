from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Change this to your PostgreSQL URL, e.g., "postgresql://postgres:postgres@localhost:5432/wrightway"
DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/wrightway"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()