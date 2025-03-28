import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateBook from './UpdateBook';
import ViewBook from './ViewBook';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      setError('Error Fetching Book Data');
    } finally {
      setLoading(false);
    }
  };

  const updateBook = (bookId) => {
    setSelectedBookId(bookId);
    setShowUpdateModal(true);
  };

  const viewBook = (bookId) => {
    setSelectedBookId(bookId);
    setShowViewModal(true);
  };

  const deleteBook = async (bookId) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      try {
        await axios.delete(`/api/books/${bookId}`);
        alert('Book Deleted Successfully');
        fetchBooks();
      } catch (error) {
        console.error('Error Deleting book:', error);
        alert('Failed to delete book');
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedBookId(null);
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
    setSelectedBookId(null);
  };

  if (loading) return <div className='text-center mt-5'>Loading......</div>;
  if (error) return <div className='alert alert-danger text-center'>{error}</div>;

  return (
    <div className='container mt-5'>
      <h1 className='text-center mb-4'>Books List</h1>
      <button className='btn btn-primary mb-4' onClick={fetchBooks}>
        Refresh Books List
      </button>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
      
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
              
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className='btn btn-info' onClick={() => viewBook(book.id)}>
                      View
                    </button>
                    <button className='btn btn-primary' onClick={() => updateBook(book.id)}>
                      Update
                    </button>
                    <button className='btn btn-danger' onClick={() => deleteBook(book.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {showUpdateModal && (
        <UpdateBook bookId={selectedBookId} onClose={handleUpdateModalClose} onUpdate={fetchBooks} />
      )}
      
      {showViewModal && (
        <ViewBook bookId={selectedBookId} onClose={handleViewModalClose} />
      )}
    </div>
  );
};

export default BookList;