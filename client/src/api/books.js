import axios from 'axios';

// Base URL for your FastAPI backend
const API_URL = 'http://localhost:8000';

// This file contains all API calls to the backend
// Keeping them in one place makes it easy to manage and reuse

// CREATE - Add a new book
export const createBook = async (bookData) => {
  try {
    // POST request to /books endpoint
    // bookData should be an object like:
    // { title: "...", author: "...", status: "...", genre: "...", notes: "..." }
    const response = await axios.post(`${API_URL}/books`, bookData);
    
    // Return the created book (includes the ID from database)
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error; // Re-throw so the component can handle it
  }
};

// READ - Get all books
export const getBooks = async () => {
  try {
    // GET request to /books endpoint
    const response = await axios.get(`${API_URL}/books`);
    
    // Returns an array of books
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// READ - Get a single book by ID
export const getBook = async (bookId) => {
  try {
    // GET request to /books/{id} endpoint
    const response = await axios.get(`${API_URL}/books/${bookId}`);
    
    // Returns a single book object
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

// UPDATE - Modify an existing book
export const updateBook = async (bookId, bookData) => {
  try {
    // PUT request to /books/{id} endpoint
    // bookData can include only the fields you want to update
    const response = await axios.put(`${API_URL}/books/${bookId}`, bookData);
    
    // Returns the updated book
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// DELETE - Remove a book
export const deleteBook = async (bookId) => {
  try {
    // DELETE request to /books/{id} endpoint
    await axios.delete(`${API_URL}/books/${bookId}`);
    
    // DELETE returns no content, so no response.data
    return true;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// Understanding the pattern:
// 1. Each function corresponds to a backend endpoint
// 2. axios.METHOD matches the HTTP method (POST, GET, PUT, DELETE)
// 3. We use async/await to handle the asynchronous nature of API calls
// 4. Errors are caught and logged, then re-thrown for the component to handle
// 5. We always return response.data, which is the actual JSON from the backend