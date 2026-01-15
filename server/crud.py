from sqlalchemy.orm import Session
from models import Book
from schemas import BookCreate, BookUpdate

# CREATE - Add a new book to the database
def create_book(db: Session, book: BookCreate):
    """
    Takes a BookCreate schema and saves it to the database
    
    Args:
        db: Database session
        book: BookCreate schema with book data
    
    Returns:
        The newly created Book object with its ID
    """
    # Create a new Book instance from the schema data
    # **book.dict() unpacks the schema into keyword arguments
    db_book = Book(**book.dict())
    
    # Add the book to the session (staging area)
    db.add(db_book)
    
    # Commit the transaction (actually save to database)
    db.commit()
    
    # Refresh to get the ID that Postgres generated
    db.refresh(db_book)
    
    return db_book

# READ - Get all books
def get_books(db: Session, skip: int = 0, limit: int = 100):
    """
    Retrieve all books from the database
    
    Args:
        db: Database session
        skip: Number of records to skip (for pagination)
        limit: Maximum number of records to return
    
    Returns:
        List of Book objects
    """
    # db.query(Book) starts a query on the books table
    # .offset(skip) skips the first 'skip' records
    # .limit(limit) returns at most 'limit' records
    # .all() executes the query and returns all results
    return db.query(Book).offset(skip).limit(limit).all()

# READ - Get a single book by ID
def get_book(db: Session, book_id: int):
    """
    Retrieve a specific book by its ID
    
    Args:
        db: Database session
        book_id: The ID of the book to retrieve
    
    Returns:
        Book object if found, None otherwise
    """
    # .filter() adds a WHERE clause
    # .first() returns the first match or None
    return db.query(Book).filter(Book.id == book_id).first()

# UPDATE - Modify an existing book
def update_book(db: Session, book_id: int, book_update: BookUpdate):
    """
    Update an existing book's information
    
    Args:
        db: Database session
        book_id: The ID of the book to update
        book_update: BookUpdate schema with new data
    
    Returns:
        Updated Book object if found, None otherwise
    """
    # First, get the existing book
    db_book = get_book(db, book_id)
    
    if db_book is None:
        return None
    
    # Update only the fields that were provided
    # exclude_unset=True means only include fields that were actually set
    update_data = book_update.dict(exclude_unset=True)
    
    # Update each field
    for key, value in update_data.items():
        setattr(db_book, key, value)
    
    # Commit the changes
    db.commit()
    db.refresh(db_book)
    
    return db_book

# DELETE - Remove a book from the database
def delete_book(db: Session, book_id: int):
    """
    Delete a book from the database
    
    Args:
        db: Database session
        book_id: The ID of the book to delete
    
    Returns:
        True if deleted, False if book not found
    """
    db_book = get_book(db, book_id)
    
    if db_book is None:
        return False
    
    # Delete the book
    db.delete(db_book)
    db.commit()
    
    return True

# These are the core CRUD operations:
# CREATE: create_book() - Adds new record
# READ: get_books(), get_book() - Retrieves records
# UPDATE: update_book() - Modifies existing record
# DELETE: delete_book() - Removes record