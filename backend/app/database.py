from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
# PASTE YOUR NEON CONNECTION STRING HERE EXACTLY
DATABASE_URL = "postgresql://neondb_owner:npg_as3bdpxV4PNv@ep-restless-queen-adkuw2ih-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
# ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()