import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import BookList from "./BookList";
import CreateBook from "./CreateBook";
import "./App.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "suraj@gmail.com" && credentials.password === "suraj") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Credentials! Access Denied.");
      setCredentials({ username: "", password: "" }); 
    }
  };

  return (
    <Router>
     
      <div className="container">
        {!isAuthenticated ? (
          <div className="login-container card">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/get">Book List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/create">Create book</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-outline-danger" onClick={() => setIsAuthenticated(false)}>Logout</button>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/get" element={<BookList />} />
              <Route path="/create" element={<CreateBook />} />
             
         
            </Routes>
          </div>
        )}
      </div>
    </Router>
   
  );
}

export default App;

