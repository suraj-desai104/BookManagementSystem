import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = ({ bookId, onClose }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='alert alert-danger'>{error}</div>;
  if (!book) return <div className='alert alert-warning'>Book not found</div>;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published Year:</strong> {book.published_year}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Overview:</strong> {book.overview}</p>
        <button className='btn btn-secondary' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewBook;