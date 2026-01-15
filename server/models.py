from sqlalchemy import Column, Integer, String, Enum
from database import Base
import enum

# Define the reading status as an Enum
# This ensures only valid status values can be stored in the database
class ReadingStatus(str, enum.Enum):
    WANT_TO_READ = "want_to_read"
    READING = "reading"
    COMPLETED = "completed"

# Define the Book model
# This class represents the "books" table in our database
class Book(Base):
    __tablename__ = "books"  # The actual table name in Postgres
    
    # Define columns
    # Each attribute represents a column in the table
    
    id = Column(Integer, primary_key=True, index=True)
    # primary_key=True means this uniquely identifies each book
    # index=True creates an index for faster lookups
    
    title = Column(String, nullable=False)
    # nullable=False means this field is required (cannot be empty)
    
    author = Column(String, nullable=False)
    # The author's name
    
    status = Column(Enum(ReadingStatus), default=ReadingStatus.WANT_TO_READ)
    # The reading status - defaults to "want_to_read" if not specified
    
    genre = Column(String, nullable=True)
    # Optional field - can be empty (nullable=True)
    
    notes = Column(String, nullable=True)
    # Optional notes about the book

# Why use SQLAlchemy models?
# 1. Type safety - SQLAlchemy ensures data types are correct
# 2. Easy migrations - Can easily modify table structure later
# 3. Relationships - Can easily add related tables (like separate Authors table)
# 4. Query building - Write Python code instead of raw SQL