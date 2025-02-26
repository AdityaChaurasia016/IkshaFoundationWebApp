import React from "react";
import { Link } from "react-router-dom";

const BookManagementSystem = () => {
  return (
    <div>
      <h1>Book Management</h1>
      <Link to='/add-book'>Add a Book</Link>
      <Link to='/books'> Show Books</Link>
    </div>
  );
};

export default BookManagementSystem;