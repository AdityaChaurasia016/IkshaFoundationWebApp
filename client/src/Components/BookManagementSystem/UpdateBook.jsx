import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    condition: "",
    schoolName: "",
    schoolCity: "",
    donatedBy: "",
    quantity: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // `http://localhost:5000/books/getbooks/${id}`
        const resp = await axios.get(`https://iksha-foundation-web-app-api.vercel.app/books/getbooks/${id}`);
        setBook(resp.data);
      } catch (error) {
        console.log("Error fetching book data:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // `http://localhost:5000/books/updatebook/${id}`
      await axios.put(`https://iksha-foundation-web-app-api.vercel.app/books/updatebook/${id}`, book);
      alert("Book updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
    if (!isConfirmed) return;

    try {
      // `http://localhost:5000/books/deletebook/${id}`

      await axios.delete(`https://iksha-foundation-web-app-api.vercel.app/books/deletebook/${id}`);
      alert("Book deleted successfully");
      navigate("/BookList");
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-3xl font-semibold text-red-600 mb-6">Update Book</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {[
          "title",
          "author",
          "genre",
          "publishedYear",
          "condition",
          "schoolName",
          "schoolCity",
          "donatedBy",
          "quantity",
          "description",
        ].map((field, index) => (
          <div key={index} className="relative w-full border border-red-500 rounded px-3 pt-4 pb-2">
            <label className="absolute top-[-10px] left-3 bg-white px-1 text-red-500 text-sm">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "publishedYear" || field === "quantity" ? "number" : "text"}
              name={field}
              value={book[field]}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none text-gray-700"
              required={field !== "description"}
            />
          </div>
        ))}

        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="w-1/2 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
          >
            Update Book
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-1/2 bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition"
          >
            Delete Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;