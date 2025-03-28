import React, { useState } from "react";
import axios from "axios";
import BookList from "./BookList";
import { Link } from "react-router-dom";

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: "",
    publisher: "",
    overview: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/books/add", book);
      setMessage("Book Created Successfully!");
      setBook({
        title: "",
        author: "",
        published_year: "",
        publisher: "",
        overview: "",
      });
    } catch (error) {
      setMessage("Error Creating Book.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-3">Create New Book</h1>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChanges}
            className="form-control"
            placeholder="Enter book title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChanges}
            className="form-control"
            placeholder="Enter author name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="published_year" className="form-label">Published Year:</label>
          <input
            type="number"
            id="published_year"
            name="published_year"
            value={book.published_year}
            onChange={handleInputChanges}
            className="form-control"
            placeholder="Enter published year"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">Publisher:</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChanges}
            className="form-control"
            placeholder="Enter publisher"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="overview" className="form-label">Overview:</label>
          <textarea
            id="overview"
            name="overview"
            value={book.overview}
            onChange={handleInputChanges}
            className="form-control"
            placeholder="Enter book overview"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add
        </button>
      </form>
      {message && (
        <div className="alert mt-4 text-center" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateBook;
