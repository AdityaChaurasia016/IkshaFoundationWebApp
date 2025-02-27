import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imagee from "../../assets/NO_IMAG.png";
import { FaArrowRightLong } from "react-icons/fa6";

const BookList = () => {
  const [Data, setData] = useState([]);

  const fetchData = async () => {
    try {                         
      // http://localhost:5000/books/getbooks
      const resp = await axios.get("https://iksha-foundation-web-app-api.vercel.app/books/getbooks");
      setData(resp.data); 
    } catch (error) {
      console.log("Not working");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Link to='/add-book'>
            <div className="bg-red-900 rounded-md border m-5 p-4 px-5 flex items-center justify-between hover:bg-red-700 transition duration-500">
            <p className="text-3xl text-white">Add a Book</p>
            <FaArrowRightLong color={'white'} size={30} className="mr-6"/>
            </div>
            </Link>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Data.map((book, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
          <img
            src={book.imageUrl || imagee}
            alt={book.title}
            className="w-full h-[400px] object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-2">{book.title}</h2>
          <p className="text-gray-600">By {book.author}</p>
          <p className="text-gray-500 text-sm">Genre: {book.genre}</p>
          <p className="text-gray-500 text-sm">Published: {book.publishedYear}</p>
          <p className="text-gray-500 text-sm">Condition: {book.condition}</p>

          <div className=" space-x-12 mt-4">
            <Link
              to={`/update/${book._id}`}
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Edit
            </Link>
            <Link
              to={`/details/${book._id}`}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Details
            </Link>
          </div>
        </div>  
      ))}
    </div>
    </div>
  );
};

export default BookList;