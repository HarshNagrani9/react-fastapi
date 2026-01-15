import { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import BookItem from './BookItem';
import './BookList.css';

function BookList({ refreshTrigger }) {
  // State to store the list of books
  const [books, setBooks] = useState([]);
  
  // State to track loading
  const [isLoading, setIsLoading] = useState(true);
  
  // State for errors
  const [error, setError] = useState(null);

  // Fetch books from the backend
  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getBooks();
      setBooks(data);
      console.log('Fetched books:', data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
      setError('Failed to load books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect runs when component mounts and when refreshTrigger changes
  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  // Handle book update
  const handleBookUpdated = (updatedBook) => {
    // Update the book in the local state
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  };

  // Handle book deletion
  const handleBookDeleted = (deletedBookId) => {
    // Remove the book from local state
    setBooks(prevBooks => 
      prevBooks.filter(book => book.id !== deletedBookId)
    );
  };

  // Filter books by status
  const getBooksByStatus = (status) => {
    return books.filter(book => book.status === status);
  };

  if (isLoading) {
    return (
      <div className="book-list">
        <div className="book-list-loading">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-list">
        <div className="book-list-error">
          {error}
          <div className="book-list-error-actions">
            <button onClick={fetchBooks} className="btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="book-list">
        <div className="book-list-empty">
          <div className="book-list-empty-icon">📚</div>
          <p className="book-list-empty-text">No books yet.</p>
          <p className="text-secondary">Add your first book above!</p>
        </div>
      </div>
    );
  }

  const wantToReadBooks = getBooksByStatus('want_to_read');
  const readingBooks = getBooksByStatus('reading');
  const completedBooks = getBooksByStatus('completed');

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2 className="book-list-title">
          My Library
          <span className="book-count">{books.length} {books.length === 1 ? 'book' : 'books'}</span>
        </h2>
      </div>

      {/* Want to Read Section */}
      {wantToReadBooks.length > 0 && (
        <div className="status-section status-want-to-read">
          <div className="status-section-header">
            <h3 className="status-section-title">
              📚 Want to Read
              <span className="status-section-count">{wantToReadBooks.length}</span>
            </h3>
          </div>
          <div className="books-grid">
            {wantToReadBooks.map(book => (
              <BookItem 
                key={book.id} 
                book={book}
                onBookUpdated={handleBookUpdated}
                onBookDeleted={handleBookDeleted}
              />
            ))}
          </div>
        </div>
      )}

      {/* Currently Reading Section */}
      {readingBooks.length > 0 && (
        <div className="status-section status-reading">
          <div className="status-section-header">
            <h3 className="status-section-title">
              📖 Currently Reading
              <span className="status-section-count">{readingBooks.length}</span>
            </h3>
          </div>
          <div className="books-grid">
            {readingBooks.map(book => (
              <BookItem 
                key={book.id} 
                book={book}
                onBookUpdated={handleBookUpdated}
                onBookDeleted={handleBookDeleted}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {completedBooks.length > 0 && (
        <div className="status-section status-completed">
          <div className="status-section-header">
            <h3 className="status-section-title">
              ✅ Completed
              <span className="status-section-count">{completedBooks.length}</span>
            </h3>
          </div>
          <div className="books-grid">
            {completedBooks.map(book => (
              <BookItem 
                key={book.id} 
                book={book}
                onBookUpdated={handleBookUpdated}
                onBookDeleted={handleBookDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;

// Key concepts:
// 1. useEffect - Fetch data when component mounts
// 2. Dependency array - Re-fetch when refreshTrigger changes
// 3. State management - books, loading, error states
// 4. Conditional rendering - Show loading, error, or empty state
// 5. Data filtering - Group books by status
// 6. Props drilling - Pass callbacks down to BookItem
// 7. State updates - Update local state when books change (optimistic UI)