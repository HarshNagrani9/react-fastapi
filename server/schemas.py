from pydantic import BaseModel, Field
from typing import Optional
from models import ReadingStatus

# Base schema with common fields
# This is what the API will accept when creating a new book
class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    # Field(...) means required
    # min_length=1 ensures title isn't empty
    
    author: str = Field(..., min_length=1, max_length=100)
    
    status: ReadingStatus = ReadingStatus.WANT_TO_READ
    # Defaults to "want_to_read" if not provided
    
    genre: Optional[str] = Field(None, max_length=50)
    # Optional[str] means this field can be None (not provided)
    
    notes: Optional[str] = Field(None, max_length=1000)

# Schema for creating a book
# Used in POST /books endpoint
class BookCreate(BookBase):
    pass  # Inherits all fields from BookBase
    # We separate this so we can have different validation rules
    # for create vs update if needed

# Schema for updating a book
# Used in PUT /books/{id} endpoint
class BookUpdate(BaseModel):
    # All fields are optional for updates
    # This allows partial updates (e.g., just changing status)
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    author: Optional[str] = Field(None, min_length=1, max_length=100)
    status: Optional[ReadingStatus] = None
    genre: Optional[str] = Field(None, max_length=50)
    notes: Optional[str] = Field(None, max_length=1000)

# Schema for returning book data
# Used when sending data back to the frontend
class Book(BookBase):
    id: int  # Include the database ID when returning data
    
    class Config:
        # This tells Pydantic to work with SQLAlchemy models
        # It allows converting database objects to JSON
        from_attributes = True

# Why separate schemas?
# 1. BookCreate: Validates incoming data when creating
# 2. BookUpdate: Allows partial updates
# 3. Book: Includes ID field for responses
# This separation gives us flexibility and better validation