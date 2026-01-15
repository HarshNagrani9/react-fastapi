import { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  // State to trigger refresh of book list
  // When this changes, BookList will re-fetch data
  const [refreshKey, setRefreshKey] = useState(0);

  // Called when a new book is added
  const handleBookAdded = (newBook) => {
    console.log('New book added:', newBook);
    // Increment refreshKey to trigger BookList to re-fetch
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">
            📚 My Personal Library
          </h1>
          <p className="app-subtitle">
            Track your reading journey
          </p>
        </header>

        {/* Form to add new books */}
        <BookForm onBookAdded={handleBookAdded} />

        {/* List of all books */}
        <BookList refreshTrigger={refreshKey} />
      </div>
    </div>
  );
}

export default App;

// Understanding the flow:
// 1. User fills out BookForm
// 2. BookForm calls createBook API
// 3. BookForm calls onBookAdded callback
// 4. App increments refreshKey
// 5. BookList detects refreshKey change
// 6. BookList fetches updated data from backend
// 7. UI updates with new book

// This pattern is called "lifting state up"
// The parent (App) manages when to refresh data
// Children (BookForm, BookList) notify parent of changes