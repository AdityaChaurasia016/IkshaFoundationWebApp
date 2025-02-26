// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import imagee from "../../assets/NO_IMAG.png";

// const BookDetails = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const resp = await axios.get(`http://localhost:5000/books/getbooks/${id}`);
//         setBook(resp.data);
//       } catch (error) {
//         console.log("Error fetching book details:", error);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   if (!book) {
//     return <p className="text-center text-gray-600">Loading...</p>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-start">
//       <div className="md:w-1/3">
//         <img
//           src={book.imageUrl || imagee}
//           alt={book.title}
//           className="w-full h-[500px] object-cover rounded-md"
//         />
//       </div>
//       <div className="md:w-2/3 md:pl-10">
//         <h2 className="text-3xl font-semibold text-black">{book.title}</h2>
//         <p className="text-black mt-2"><span className="text-red-600 font-bold">By:</span> {book.author}</p>
//         <p className="text-black mt-2"><span className="text-red-600 font-bold">Genre:</span> {book.genre}</p>
//         <p className="text-black"><span className="text-red-600 font-bold">Published:</span> {book.publishedYear}</p>
//         <p className="text-black"><span className="text-red-600 font-bold">Condition:</span> {book.condition}</p>
//         <p className="text-black"><span className="text-red-600 font-bold">School:</span> {book.schoolName}, {book.schoolCity}</p>
//         <p className="text-black"><span className="text-red-600 font-bold">Donated By:</span> {book.donatedBy}</p>
//         <p className="text-black"><span className="text-red-600 font-bold">Quantity:</span> {book.quantity}</p>
//         <p className="text-black"><span className="text-red-600 font-bold">Description:</span> {book.description}</p>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import imagee from "../../assets/NO_IMAG.png";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/books/getbooks/${id}`);
        setBook(resp.data);
      } catch (error) {
        console.log("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-start">
      <div className="md:w-1/3 float-left">
        <img
          src={book.imageUrl || imagee}
          alt={book.title}
          className="w-full h-[500px] object-cover rounded-md"
        />
      </div>
      <div className="md:w-2/3 md:pl-10 float-left">
        <h2 className="text-3xl font-semibold text-black">{book.title}</h2>
        <p className="text-black mt-2"><span className="text-red-600 font-bold">By:</span> {book.author}</p>
        <p className="text-black mt-2"><span className="text-red-600 font-bold">Genre:</span> {book.genre}</p>
        <p className="text-black"><span className="text-red-600 font-bold">Published:</span> {book.publishedYear}</p>
        <p className="text-black"><span className="text-red-600 font-bold">Condition:</span> {book.condition}</p>
        <p className="text-black"><span className="text-red-600 font-bold">School:</span> {book.schoolName}, {book.schoolCity}</p>
        <p className="text-black"><span className="text-red-600 font-bold">Donated By:</span> {book.donatedBy}</p>
        <p className="text-black"><span className="text-red-600 font-bold">Quantity:</span> {book.quantity}</p>
        <p className="text-black"><span className="text-red-600 font-bold">Description:</span> {book.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
