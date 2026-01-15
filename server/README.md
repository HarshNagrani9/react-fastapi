# 📚 Book Library API - Backend Documentation

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

This is a **FastAPI-based REST API** for managing a personal book library. The API provides full CRUD (Create, Read, Update, Delete) operations for books, allowing users to track their reading journey with features like reading status, genres, and personal notes.

The backend is built with:
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM for database operations
- **PostgreSQL** - Robust relational database
- **Pydantic** - Data validation using Python type annotations

---

## Features

✅ **Full CRUD Operations**
- Create new books with detailed information
- Retrieve all books or a specific book by ID
- Update existing book information (partial updates supported)
- Delete books from the library

✅ **Reading Status Tracking**
- Track books as "Want to Read", "Reading", or "Completed"
- Enum-based status validation ensures data integrity

✅ **Rich Book Information**
- Title and Author (required fields)
- Genre categorization
- Personal notes for each book
- Reading status tracking

✅ **API Features**
- Automatic API documentation (Swagger UI)
- CORS middleware for frontend integration
- Input validation and error handling
- Database connection pooling
- Environment-based configuration

---

## Tech Stack

### Core Framework
- **FastAPI** (v0.128.0) - Web framework for building APIs
- **Uvicorn** (v0.40.0) - ASGI server for running FastAPI

### Database & ORM
- **SQLAlchemy** (v2.0.45) - Python SQL toolkit and ORM
- **PostgreSQL** - Relational database (via psycopg2-binary)

### Data Validation
- **Pydantic** (v2.12.5) - Data validation using Python type annotations

### Utilities
- **python-dotenv** (v1.2.1) - Environment variable management

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.8+** (Python 3.13 recommended)
   ```bash
   python3 --version
   ```

2. **PostgreSQL** (v12+ recommended)
   - Install PostgreSQL: https://www.postgresql.org/download/
   - Ensure PostgreSQL service is running
   ```bash
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   
   # Windows
   # Start PostgreSQL service from Services panel
   ```

3. **pip** (Python package manager)
   ```bash
   python3 -m pip --version
   ```

4. **Git** (for version control)
   ```bash
   git --version
   ```

---

## Installation

### Step 1: Clone the Repository
```bash
cd /path/to/your/projects
git clone <repository-url>
cd react-fastapi/server
```

### Step 2: Create Virtual Environment
```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

**Note:** After activation, your terminal prompt should show `(venv)`.

### Step 3: Install Dependencies
```bash
# Upgrade pip to latest version
pip install --upgrade pip

# Install all required packages
pip install -r requirements.txt
```

This will install:
- `fastapi`
- `uvicorn`
- `sqlalchemy`
- `psycopg2-binary`
- `pydantic`
- `python-dotenv`

### Step 4: Verify Installation
```bash
# Check if FastAPI is installed correctly
python -c "import fastapi; print(fastapi.__version__)"

# Check if all dependencies are installed
pip list
```

---

## Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```bash
# .env file
DATABASE_URL=postgresql://username:password@localhost:5432/book_library_db
```

**Explanation:**
- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://[user]:[password]@[host]:[port]/[database]`
  - Default PostgreSQL port: `5432`
  - Replace `username`, `password`, and `database` with your values

### Setting Up PostgreSQL Database

1. **Create a new database:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE book_library_db;
   
   # Create a user (optional, you can use default postgres user)
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE book_library_db TO your_username;
   
   # Exit psql
   \q
   ```

2. **Update `.env` file** with your database credentials:
   ```env
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/book_library_db
   ```

### Example `.env` File
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/book_library_db

# Optional: Server Configuration
# HOST=0.0.0.0
# PORT=8000
```

**⚠️ Security Note:** Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## Running the Application

### Development Mode

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate  # Windows

# Run the development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Flags explanation:**
- `--reload` - Auto-reload server on code changes (development only)
- `--host 0.0.0.0` - Make server accessible from any network interface
- `--port 8000` - Run on port 8000

### Production Mode

```bash
# Run without reload flag for production
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Verify Server is Running

1. **Check server logs** - You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   INFO:     Started reloader process
   INFO:     Started server process
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   ```

2. **Test the API:**
   ```bash
   # Test root endpoint
   curl http://localhost:8000/
   
   # Expected response:
   # {"message":"Welcome to the Book Library App"}
   ```

3. **Access API Documentation:**
   - **Swagger UI:** http://localhost:8000/docs
   - **ReDoc:** http://localhost:8000/redoc

---

## Project Structure

```
server/
├── main.py              # FastAPI application entry point
├── database.py          # Database connection and session management
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic schemas for request/response validation
├── crud.py              # CRUD operations (Create, Read, Update, Delete)
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not in git)
├── venv/                # Virtual environment (not in git)
└── README.md            # This file
```

### File Descriptions

#### `main.py`
- FastAPI application instance
- API route definitions
- CORS middleware configuration
- Database table creation on startup

#### `database.py`
- SQLAlchemy engine configuration
- Database session management
- Connection pooling setup
- `get_db()` dependency for dependency injection

#### `models.py`
- SQLAlchemy ORM models
- Database table definitions
- Enum definitions (ReadingStatus)
- Table relationships (if any)

#### `schemas.py`
- Pydantic models for request validation
- Response models
- Data transformation schemas
- Field validation rules

#### `crud.py`
- Database operations (CRUD)
- Business logic for data manipulation
- Query building functions
- Error handling for database operations

---

## API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Root Endpoint
**GET** `/`

Welcome message endpoint.

**Response:**
```json
{
  "message": "Welcome to the Book Library App"
}
```

---

#### 2. Create Book
**POST** `/books`

Create a new book in the library.

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "status": "want_to_read",
  "genre": "Fiction",
  "notes": "Classic American novel"
}
```

**Field Descriptions:**
- `title` (string, required) - Book title (1-200 characters)
- `author` (string, required) - Author name (1-100 characters)
- `status` (enum, optional) - Reading status: `want_to_read`, `reading`, `completed` (default: `want_to_read`)
- `genre` (string, optional) - Book genre (max 50 characters)
- `notes` (string, optional) - Personal notes (max 1000 characters)

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "status": "want_to_read",
  "genre": "Fiction",
  "notes": "Classic American novel"
}
```

**Example using curl:**
```bash
curl -X POST "http://localhost:8000/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "status": "want_to_read",
    "genre": "Fiction",
    "notes": "Classic American novel"
  }'
```

---

#### 3. Get All Books
**GET** `/books`

Retrieve all books from the library.

**Query Parameters:**
- `skip` (integer, optional) - Number of records to skip (default: 0)
- `limit` (integer, optional) - Maximum number of records to return (default: 100)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "status": "want_to_read",
    "genre": "Fiction",
    "notes": "Classic American novel"
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "status": "reading",
    "genre": "Dystopian Fiction",
    "notes": null
  }
]
```

**Example using curl:**
```bash
# Get all books
curl "http://localhost:8000/books"

# Get books with pagination
curl "http://localhost:8000/books?skip=0&limit=10"
```

---

#### 4. Get Book by ID
**GET** `/books/{book_id}`

Retrieve a specific book by its ID.

**Path Parameters:**
- `book_id` (integer, required) - The ID of the book

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "status": "want_to_read",
  "genre": "Fiction",
  "notes": "Classic American novel"
}
```

**Error Response:** `404 Not Found`
```json
{
  "detail": "Book not found"
}
```

**Example using curl:**
```bash
curl "http://localhost:8000/books/1"
```

---

#### 5. Update Book
**PUT** `/books/{book_id}`

Update an existing book. All fields are optional - only provided fields will be updated.

**Path Parameters:**
- `book_id` (integer, required) - The ID of the book to update

**Request Body:**
```json
{
  "status": "completed",
  "notes": "Finished reading. Great book!"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "status": "completed",
  "genre": "Fiction",
  "notes": "Finished reading. Great book!"
}
```

**Error Response:** `404 Not Found`
```json
{
  "detail": "Book not found"
}
```

**Example using curl:**
```bash
curl -X PUT "http://localhost:8000/books/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "notes": "Finished reading. Great book!"
  }'
```

---

#### 6. Delete Book
**DELETE** `/books/{book_id}`

Delete a book from the library.

**Path Parameters:**
- `book_id` (integer, required) - The ID of the book to delete

**Response:** `204 No Content`

**Error Response:** `404 Not Found`
```json
{
  "detail": "Book not found"
}
```

**Example using curl:**
```bash
curl -X DELETE "http://localhost:8000/books/1"
```

---

### Error Responses

All endpoints may return the following error responses:

**400 Bad Request** - Invalid input data
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**404 Not Found** - Resource not found
```json
{
  "detail": "Book not found"
}
```

**500 Internal Server Error** - Server error
```json
{
  "detail": "Internal server error"
}
```

---

## Database Schema

### Books Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `title` | VARCHAR | NOT NULL | Book title |
| `author` | VARCHAR | NOT NULL | Author name |
| `status` | ENUM | DEFAULT 'want_to_read' | Reading status |
| `genre` | VARCHAR | NULLABLE | Book genre |
| `notes` | VARCHAR | NULLABLE | Personal notes |

### Reading Status Enum

- `want_to_read` - Book is in the wishlist
- `reading` - Currently reading the book
- `completed` - Finished reading the book

### SQL Schema (PostgreSQL)

```sql
CREATE TYPE reading_status AS ENUM ('want_to_read', 'reading', 'completed');

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    status reading_status DEFAULT 'want_to_read',
    genre VARCHAR,
    notes VARCHAR
);

CREATE INDEX ix_books_id ON books (id);
```

---

## Development Workflow

### 1. Starting Development

```bash
# Activate virtual environment
source venv/bin/activate

# Start development server with auto-reload
uvicorn main:app --reload
```

### 2. Making Changes

1. **Modify code** in your editor
2. **Save files** - Server auto-reloads (if `--reload` flag is used)
3. **Test changes** using:
   - Swagger UI: http://localhost:8000/docs
   - curl commands
   - Frontend application

### 3. Database Migrations

Currently, tables are created automatically on startup via:
```python
models.Base.metadata.create_all(bind=engine)
```

For production, consider using **Alembic** for proper migrations:
```bash
pip install alembic
alembic init alembic
```

### 4. Code Structure Best Practices

- **Models** (`models.py`) - Define database structure
- **Schemas** (`schemas.py`) - Define API input/output structure
- **CRUD** (`crud.py`) - Business logic and database operations
- **Routes** (`main.py`) - API endpoints and request handling

---

## Testing

### Manual Testing with Swagger UI

1. Navigate to http://localhost:8000/docs
2. Use the interactive API documentation
3. Test all endpoints directly from the browser

### Testing with curl

```bash
# Create a book
curl -X POST "http://localhost:8000/books" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Book", "author": "Test Author"}'

# Get all books
curl "http://localhost:8000/books"

# Get specific book
curl "http://localhost:8000/books/1"

# Update book
curl -X PUT "http://localhost:8000/books/1" \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Delete book
curl -X DELETE "http://localhost:8000/books/1"
```

### Automated Testing (Future Enhancement)

Consider adding pytest for automated testing:
```bash
pip install pytest pytest-asyncio httpx
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error
**Error:** `sqlalchemy.exc.OperationalError: could not connect to server`

**Solutions:**
- Verify PostgreSQL is running: `pg_isready`
- Check database credentials in `.env` file
- Ensure database exists: `psql -U postgres -l`
- Verify connection string format: `postgresql://user:pass@host:port/db`

#### 2. Port Already in Use
**Error:** `Address already in use`

**Solutions:**
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or use a different port
uvicorn main:app --port 8001
```

#### 3. Module Not Found Error
**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solutions:**
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`
- Verify installation: `pip list`

#### 4. CORS Errors
**Error:** CORS policy blocking requests from frontend

**Solutions:**
- Check CORS origins in `main.py`
- Ensure frontend URL is in `allow_origins` list
- Restart server after changes

#### 5. Environment Variables Not Loading
**Error:** `KeyError: 'DATABASE_URL'`

**Solutions:**
- Verify `.env` file exists in `server` directory
- Check `.env` file format (no spaces around `=`)
- Ensure `python-dotenv` is installed
- Restart server after creating `.env` file

---

## Contributing

### Code Style

- Follow **PEP 8** Python style guide
- Use type hints for function parameters and return types
- Write docstrings for functions and classes
- Keep functions focused and single-purpose

### Adding New Features

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes:**
   - Update models if database changes needed
   - Add schemas for new endpoints
   - Implement CRUD operations
   - Add routes in `main.py`

3. **Test thoroughly:**
   - Test with Swagger UI
   - Test with curl commands
   - Test error cases

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add new feature: description"
   ```

5. **Push and create pull request**

---

## Additional Resources

- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **SQLAlchemy Documentation:** https://docs.sqlalchemy.org/
- **Pydantic Documentation:** https://docs.pydantic.dev/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/

---

## License

[Add your license information here]

---

## Support

For issues, questions, or contributions, please [open an issue](link-to-issues) or contact the maintainers.

---

**Last Updated:** [Current Date]
**Version:** 1.0.0

