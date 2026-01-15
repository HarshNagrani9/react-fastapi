import { useState } from 'react';
import { updateBook, deleteBook } from '../api/books';
import './BookItem.css';

function BookItem({ book, onBookUpdated, onBookDeleted }) {
  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State for the edit form
  const [editData, setEditData] = useState({
    title: book.title,
    author: book.author,
    status: book.status,
    genre: book.genre || '',
    notes: book.notes || ''
  });

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await deleteBook(book.id);
        console.log('Book deleted:', book.id);
        
        // Notify parent component
        if (onBookDeleted) {
          onBookDeleted(book.id);
        }
      } catch (err) {
        console.error('Failed to delete book:', err);
        alert('Failed to delete book');
      }
    }
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      // Send only the fields that changed
      const updatedBook = await updateBook(book.id, editData);
      console.log('Book updated:', updatedBook);
      
      // Exit edit mode
      setIsEditing(false);
      
      // Notify parent component
      if (onBookUpdated) {
        onBookUpdated(updatedBook);
      }
    } catch (err) {
      console.error('Failed to update book:', err);
      alert('Failed to update book');
    }
  };

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Cancel edit mode
  const handleCancel = () => {
    // Reset edit data to original values
    setEditData({
      title: book.title,
      author: book.author,
      status: book.status,
      genre: book.genre || '',
      notes: book.notes || ''
    });
    setIsEditing(false);
  };

  // Format status for display
  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    return status.replace('_', '-');
  };

  return (
    <div className="book-item" data-status={book.status}>
      {!isEditing ? (
        // VIEW MODE
        <div className="book-item-view">
          <div className="book-item-header">
            <div className="book-item-content">
              <h3 className="book-item-title">{book.title}</h3>
              <p className="book-item-author">{book.author}</p>
              
              <div className="book-item-meta">
                <span className={`book-status-badge ${getStatusBadgeClass(book.status)}`}>
                  {formatStatus(book.status)}
                </span>
                {book.genre && (
                  <span className="book-genre">{book.genre}</span>
                )}
              </div>
              
              {book.notes && (
                <div className="book-notes">{book.notes}</div>
              )}
            </div>
            
            <div className="book-item-actions">
              <button 
                onClick={() => setIsEditing(true)}
                className="btn-secondary"
              >
                ✏️ Edit
              </button>
              <button 
                onClick={handleDelete}
                className="btn-danger"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        // EDIT MODE
        <div className="book-item-edit">
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleChange}
                required
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="author"
                value={editData.author}
                onChange={handleChange}
                required
                placeholder="Author"
              />
            </div>
            <div className="form-group">
              <select
                name="status"
                value={editData.status}
                onChange={handleChange}
              >
                <option value="want_to_read">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="genre"
                value={editData.genre}
                onChange={handleChange}
                placeholder="Genre (optional)"
              />
            </div>
            <div className="form-group">
              <textarea
                name="notes"
                value={editData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Notes (optional)"
              />
            </div>
            <div className="book-item-edit-actions">
              <button 
                type="submit"
                className="btn-success"
              >
                💾 Save
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookItem;

// Key concepts:
// 1. Conditional rendering - Show different UI based on isEditing state
// 2. Local state management - Edit form data separate from book data
// 3. Callbacks - onBookUpdated and onBookDeleted notify parent
// 4. Inline editing - Toggle between view and edit modes
// 5. Confirmation - Ask user before deleting