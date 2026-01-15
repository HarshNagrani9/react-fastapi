# 📚 Book Library Frontend - React Application Documentation

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Component Documentation](#component-documentation)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Styling](#styling)
- [Development Workflow](#development-workflow)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

This is a **React + TypeScript** frontend application for managing a personal book library. The application provides an intuitive user interface for tracking books, their reading status, genres, and personal notes.

The frontend is built with:
- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests

---

## Features

✅ **Book Management**
- Add new books with detailed information
- View all books organized by reading status
- Update book information (title, author, status, genre, notes)
- Delete books from the library

✅ **Reading Status Organization**
- Books automatically grouped by status:
  - 📚 Want to Read
  - 📖 Currently Reading
  - ✅ Completed

✅ **User Experience**
- Real-time updates after adding/editing/deleting books
- Loading states during API calls
- Error handling with user-friendly messages
- Responsive design
- Form validation

✅ **Modern React Patterns**
- Functional components with hooks
- State lifting for parent-child communication
- Controlled components for form inputs
- Effect hooks for data fetching

---

## Tech Stack

### Core Framework
- **React** (v19.2.0) - UI library
- **React DOM** (v19.2.0) - React renderer for web

### Build Tools
- **Vite** (v7.2.4) - Build tool and dev server
- **TypeScript** (v5.9.3) - Type-safe JavaScript
- **SWC** - Fast TypeScript/JavaScript compiler

### HTTP Client
- **Axios** (v1.13.2) - Promise-based HTTP client

### Development Tools
- **ESLint** (v9.39.1) - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18.0.0 or higher)
   ```bash
   node --version
   ```

2. **npm** (v9.0.0 or higher) - Comes with Node.js
   ```bash
   npm --version
   ```

3. **Git** (for version control)
   ```bash
   git --version
   ```

4. **Backend API** - The FastAPI backend should be running
   - See `../server/README.md` for backend setup
   - Backend should be accessible at `http://localhost:8000`

---

## Installation

### Step 1: Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all packages listed in `package.json`:
- React and React DOM
- TypeScript and type definitions
- Vite and plugins
- Axios
- ESLint and plugins

### Step 3: Verify Installation
```bash
# Check if node_modules exists
ls node_modules

# Verify React is installed
npm list react
```

---

## Configuration

### API Configuration

The API base URL is configured in `src/api/books.js`:

```javascript
const API_URL = 'http://localhost:8000';
```

**To change the API URL:**

1. **For Development:**
   - Edit `src/api/books.js`
   - Change `API_URL` to your backend URL

2. **For Production:**
   - Use environment variables (recommended)
   - Create `.env` file:
     ```env
     VITE_API_URL=http://your-api-url.com
     ```
   - Update `books.js`:
     ```javascript
     const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
     ```

### Vite Configuration

The Vite configuration is in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```

**Common Vite Configurations:**

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,           // Change dev server port
    proxy: {              // Proxy API requests
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',       // Output directory
    sourcemap: true       // Generate source maps
  }
})
```

---

## Running the Application

### Development Mode

```bash
# Start development server
npm run dev
```

The application will start at:
- **Local:** http://localhost:5173
- **Network:** http://[your-ip]:5173

**Features:**
- Hot Module Replacement (HMR) - Changes reflect instantly
- Fast refresh - React components update without losing state
- Source maps for debugging

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Other Commands

```bash
# Lint code
npm run lint

# Type check (if using TypeScript)
npx tsc --noEmit
```

---

## Project Structure

```
client/
├── public/
│   └── vite.svg              # Public assets
├── src/
│   ├── api/
│   │   └── books.js          # API service functions
│   ├── assets/
│   │   └── react.svg         # Static assets
│   ├── components/
│   │   ├── BookForm.jsx      # Form for adding/editing books
│   │   ├── BookItem.jsx      # Individual book card component
│   │   └── BookList.jsx      # List of all books
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.tsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.node.json        # Node-specific TypeScript config
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

### Directory Descriptions

#### `src/api/`
Contains API service functions that handle all HTTP requests to the backend.

#### `src/components/`
Reusable React components:
- **BookForm** - Form for creating new books
- **BookItem** - Displays individual book with edit/delete functionality
- **BookList** - Displays all books grouped by status

#### `src/`
Root source directory containing:
- **App.tsx** - Main application component (orchestrates other components)
- **main.tsx** - Application entry point (renders App component)
- **App.css** - Component-specific styles
- **index.css** - Global styles

---

## Component Documentation

### App Component (`App.tsx`)

**Purpose:** Main application component that orchestrates child components.

**State:**
- `refreshKey` (number) - Triggers BookList refresh when incremented

**Props:** None

**Key Features:**
- Manages refresh trigger for book list
- Handles book addition callback
- Provides layout structure

**Example:**
```tsx
function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleBookAdded = (newBook) => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <BookForm onBookAdded={handleBookAdded} />
      <BookList refreshTrigger={refreshKey} />
    </div>
  );
}
```

---

### BookForm Component (`components/BookForm.jsx`)

**Purpose:** Form component for adding new books to the library.

**Props:**
- `onBookAdded` (function) - Callback when book is successfully added

**State:**
- `formData` (object) - Form field values
- `isLoading` (boolean) - Loading state during API call
- `error` (string | null) - Error message

**Form Fields:**
- `title` (string, required) - Book title
- `author` (string, required) - Author name
- `status` (enum, optional) - Reading status (default: 'want_to_read')
- `genre` (string, optional) - Book genre
- `notes` (string, optional) - Personal notes

**Key Features:**
- Controlled components (React state manages form inputs)
- Form validation (required fields)
- Loading state during submission
- Error handling and display
- Form reset after successful submission
- Calls parent callback on success

**Usage:**
```jsx
<BookForm onBookAdded={handleBookAdded} />
```

---

### BookList Component (`components/BookList.jsx`)

**Purpose:** Displays all books organized by reading status.

**Props:**
- `refreshTrigger` (number) - Triggers data refetch when changed

**State:**
- `books` (array) - List of all books
- `isLoading` (boolean) - Loading state
- `error` (string | null) - Error message

**Key Features:**
- Fetches books on mount and when `refreshTrigger` changes
- Groups books by status (Want to Read, Reading, Completed)
- Handles loading and error states
- Updates local state when books are modified/deleted
- Renders BookItem components for each book

**Usage:**
```jsx
<BookList refreshTrigger={refreshKey} />
```

---

### BookItem Component (`components/BookItem.jsx`)

**Purpose:** Displays individual book card with edit and delete functionality.

**Props:**
- `book` (object) - Book data object
- `onBookUpdated` (function) - Callback when book is updated
- `onBookDeleted` (function) - Callback when book is deleted

**State:**
- `isEditing` (boolean) - Whether book is in edit mode
- `editData` (object) - Edited book data
- `isLoading` (boolean) - Loading state during API calls
- `error` (string | null) - Error message

**Key Features:**
- Displays book information (title, author, status, genre, notes)
- Edit mode for updating book details
- Delete functionality with confirmation
- Status badge with color coding
- Optimistic UI updates
- Error handling

**Usage:**
```jsx
<BookItem 
  book={book}
  onBookUpdated={handleBookUpdated}
  onBookDeleted={handleBookDeleted}
/>
```

---

## API Integration

### API Service (`src/api/books.js`)

The API service module provides functions for all CRUD operations:

#### `createBook(bookData)`
Creates a new book.

**Parameters:**
- `bookData` (object) - Book data:
  ```javascript
  {
    title: string,
    author: string,
    status?: 'want_to_read' | 'reading' | 'completed',
    genre?: string,
    notes?: string
  }
  ```

**Returns:** Promise resolving to created book object

**Example:**
```javascript
const newBook = await createBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  status: "want_to_read",
  genre: "Fiction"
});
```

---

#### `getBooks()`
Retrieves all books.

**Returns:** Promise resolving to array of book objects

**Example:**
```javascript
const books = await getBooks();
console.log(books); // [{ id: 1, title: "...", ... }, ...]
```

---

#### `getBook(bookId)`
Retrieves a specific book by ID.

**Parameters:**
- `bookId` (number) - Book ID

**Returns:** Promise resolving to book object

**Example:**
```javascript
const book = await getBook(1);
```

---

#### `updateBook(bookId, bookData)`
Updates an existing book.

**Parameters:**
- `bookId` (number) - Book ID
- `bookData` (object) - Partial book data (only fields to update)

**Returns:** Promise resolving to updated book object

**Example:**
```javascript
const updatedBook = await updateBook(1, {
  status: "completed",
  notes: "Great book!"
});
```

---

#### `deleteBook(bookId)`
Deletes a book.

**Parameters:**
- `bookId` (number) - Book ID

**Returns:** Promise resolving to `true` on success

**Example:**
```javascript
await deleteBook(1);
```

---

### Error Handling

All API functions throw errors that should be caught:

```javascript
try {
  const book = await createBook(data);
  // Handle success
} catch (error) {
  // Handle error
  console.error('API Error:', error);
  if (error.response) {
    // Server responded with error status
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server');
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
}
```

---

## State Management

### Component State

The application uses React's `useState` hook for local state management:

**App Component:**
- `refreshKey` - Triggers BookList refresh

**BookForm Component:**
- `formData` - Form input values
- `isLoading` - Submission loading state
- `error` - Error message

**BookList Component:**
- `books` - List of books
- `isLoading` - Fetch loading state
- `error` - Error message

**BookItem Component:**
- `isEditing` - Edit mode toggle
- `editData` - Edited book data
- `isLoading` - API call loading state
- `error` - Error message

### State Lifting Pattern

The application uses "lifting state up" pattern:

1. **App** manages when to refresh the book list
2. **BookForm** notifies App when a book is added
3. **BookList** receives refresh trigger and fetches data
4. **BookItem** notifies BookList when books are updated/deleted

**Flow Diagram:**
```
User Action → Component → API Call → Callback → Parent State Update → Child Re-render
```

---

## Styling

### Current Approach

The application uses **inline styles** for component styling:

```jsx
<div style={{ 
  padding: '1rem', 
  border: '1px solid #ddd',
  borderRadius: '8px' 
}}>
```

### Styling Files

- **`src/index.css`** - Global styles and CSS resets
- **`src/App.css`** - Application-specific styles

### Styling Options

**1. CSS Modules:**
```jsx
// BookForm.module.css
.container {
  padding: 1rem;
  border: 1px solid #ddd;
}

// BookForm.jsx
import styles from './BookForm.module.css';
<div className={styles.container}>
```

**2. Styled Components:**
```bash
npm install styled-components
```

**3. Tailwind CSS:**
```bash
npm install -D tailwindcss
```

**4. CSS-in-JS Libraries:**
- Emotion
- Styled-components
- Stitches

---

## Development Workflow

### 1. Starting Development

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

### 2. Making Changes

1. **Edit files** in `src/` directory
2. **Save files** - Vite automatically reloads
3. **View changes** in browser (http://localhost:5173)
4. **Check console** for errors or warnings

### 3. Adding New Components

```bash
# Create component file
touch src/components/NewComponent.jsx

# Or with TypeScript
touch src/components/NewComponent.tsx
```

**Component Template:**
```jsx
import { useState } from 'react';

function NewComponent({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}

export default NewComponent;
```

### 4. Adding New API Functions

1. **Edit `src/api/books.js`**
2. **Add new function:**
   ```javascript
   export const newFunction = async (params) => {
     try {
       const response = await axios.METHOD(`${API_URL}/endpoint`, data);
       return response.data;
     } catch (error) {
       console.error('Error:', error);
       throw error;
     }
   };
   ```
3. **Import and use in components**

### 5. Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

---

## Building for Production

### Step 1: Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Step 2: Preview Production Build

```bash
npm run preview
```

### Step 3: Deploy

**Deploy Options:**

1. **Static Hosting (Vercel, Netlify, GitHub Pages):**
   ```bash
   # Build
   npm run build
   
   # Deploy dist/ folder
   ```

2. **Docker:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   FROM nginx:alpine
   COPY --from=0 /app/dist /usr/share/nginx/html
   ```

3. **Traditional Server:**
   - Upload `dist/` folder to web server
   - Configure server to serve `index.html` for all routes (SPA routing)

### Build Output

```
dist/
├── index.html          # Entry HTML file
├── assets/
│   ├── index-[hash].js # Bundled JavaScript
│   └── index-[hash].css # Bundled CSS
└── vite.svg            # Static assets
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
**Error:** `Port 5173 is in use`

**Solutions:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5173   # Windows

# Or use different port
npm run dev -- --port 3000
```

#### 2. Module Not Found
**Error:** `Cannot find module 'react'`

**Solutions:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. API Connection Errors
**Error:** `Network Error` or `CORS Error`

**Solutions:**
- Verify backend is running: `curl http://localhost:8000/`
- Check API URL in `src/api/books.js`
- Verify CORS configuration in backend
- Check browser console for detailed error

#### 4. TypeScript Errors
**Error:** Type errors in `.tsx` files

**Solutions:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Verify tsconfig.json settings
# Ensure types are installed: npm install --save-dev @types/react
```

#### 5. Build Errors
**Error:** Build fails with errors

**Solutions:**
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

#### 6. Hot Reload Not Working
**Solutions:**
- Restart dev server
- Clear browser cache
- Check file watcher limits (Linux)
- Verify file permissions

---

## Contributing

### Code Style

- Use **functional components** with hooks
- Follow **React best practices**
- Use **TypeScript** for type safety (where applicable)
- Write **descriptive component and function names**
- Add **comments** for complex logic

### Component Guidelines

1. **Single Responsibility** - Each component should do one thing
2. **Props Validation** - Use TypeScript or PropTypes
3. **Error Handling** - Always handle errors gracefully
4. **Loading States** - Show loading indicators during async operations
5. **Accessibility** - Use semantic HTML and ARIA attributes

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature: description"

# Push and create pull request
git push origin feature/new-feature
```

---

## Additional Resources

- **React Documentation:** https://react.dev/
- **TypeScript Documentation:** https://www.typescriptlang.org/
- **Vite Documentation:** https://vitejs.dev/
- **Axios Documentation:** https://axios-http.com/
- **ESLint Documentation:** https://eslint.org/

---

## License

[Add your license information here]

---

## Support

For issues, questions, or contributions, please [open an issue](link-to-issues) or contact the maintainers.

---

**Last Updated:** [Current Date]
**Version:** 0.0.0
