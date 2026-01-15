import { useState } from 'react';
import { createBook } from '../api/books';
import './BookForm.css';

function BookForm({ onBookAdded }) {
  // State to hold form data
  // This is the data that will be sent to the backend
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'want_to_read', // Default value
    genre: '',
    notes: ''
  });

  // State to track loading (while API call is happening)
  const [isLoading, setIsLoading] = useState(false);

  // State to show error messages
  const [error, setError] = useState(null);

  // Handle input changes
  // This updates the formData state whenever user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,        // Keep all other fields the same
      [name]: value   // Update only the field that changed
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    setIsLoading(true);
    setError(null);

    try {
      // Call the API to create a book
      const newBook = await createBook(formData);
      
      console.log('Book created:', newBook);
      
      // Clear the form after successful creation
      setFormData({
        title: '',
        author: '',
        status: 'want_to_read',
        genre: '',
        notes: ''
      });

      // Notify parent component that a book was added
      // This will trigger a refresh of the book list
      if (onBookAdded) {
        onBookAdded(newBook);
      }

    } catch (err) {
      console.error('Failed to create book:', err);
      setError('Failed to add book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book-form">
      <h2 className="book-form-title">Add New Book</h2>
      
      {error && (
        <div className="book-form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter book title"
          />
        </div>

        {/* Author Input */}
        <div className="form-group">
          <label htmlFor="author">
            Author <span className="required">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter author name"
          />
        </div>

        {/* Status Dropdown */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="want_to_read">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Genre Input */}
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g., Fiction, Science Fiction, Biography"
          />
        </div>

        {/* Notes Textarea */}
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Add your thoughts or notes about this book..."
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary btn-submit"
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;

// Key concepts:
// 1. useState - Manages form data, loading state, and errors
// 2. handleChange - Updates state as user types (controlled components)
// 3. handleSubmit - Prevents default, calls API, handles success/error
// 4. onBookAdded callback - Notifies parent component when book is added
// 5. Conditional rendering - Shows loading state and errors