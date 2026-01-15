from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the SQLAlchemy engine
# The engine is the starting point for any SQLAlchemy application
# It manages connections to the database
engine = create_engine(DATABASE_URL)

# Create a SessionLocal class
# Each instance of SessionLocal will be a database session
# We'll use this to interact with the database (queries, inserts, etc.)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class
# All our database models will inherit from this Base class
# This is how SQLAlchemy knows which classes represent database tables
Base = declarative_base()

# Dependency function to get database session
# This function will be used in our API endpoints
# It creates a new database session for each request and closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db  # This is where the magic happens - the endpoint uses the session
    finally:
        db.close()  # Always close the connection when done