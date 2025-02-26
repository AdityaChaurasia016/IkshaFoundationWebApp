// import React, { useState } from "react";
// import axios from "axios";

// const AddBook = () => {
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     genre: "",
//     publishedYear: 0,
//     condition: "New",
//     schoolName: "",
//     schoolCity: "",
//     donatedBy: "",
//     quantity: 1,
//     description: "",
//     imageUrl: "",
//   });

//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook({
//       ...book,
//       [name]: name === "publishedYear" || name === "quantity" ? Number(value) : value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let imageUrl = "";
//       if (image) {
//         const formData = new FormData();
//         formData.append("file", image);
//         formData.append("upload_preset", "IkshaFoundation");

//         const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duc30mkz8/image/upload", formData);
//         imageUrl = uploadRes.data.secure_url;
//       }

//       const bookData = { ...book, imageUrl };
//       await axios.post("http://localhost:5000/books/postbooks", bookData);

//       alert("Book added successfully!");
//       setBook({
//         title: "",
//         author: "",
//         genre: "",
//         publishedYear: 0,
//         condition: "New",
//         schoolName: "",
//         schoolCity: "",
//         donatedBy: "",
//         quantity: 1,
//         description: "",
//         imageUrl: "",
//       });
//       setImage(null);
//     } catch (error) {
//       console.error("Error adding book:", error);
//       alert("Failed to add book.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h2 className="text-3xl font-semibold text-center text-black mb-6">Add a New Book</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           {[
//             { name: "title", type: "text", label: "Title" },
//             { name: "author", type: "text", label: "Author" },
//             { name: "genre", type: "text", label: "Genre" },
//             { name: "publishedYear", type: "number", label: "Published Year" },
//             { name: "schoolName", type: "text", label: "School Name" },
//             { name: "schoolCity", type: "text", label: "School City" },
//             { name: "donatedBy", type: "text", label: "Donated By" },
//             { name: "quantity", type: "number", label: "Quantity", min: 1 },
//           ].map(({ name, type, label, min }) => (
//             <div key={name} className="relative">
//               <input
//                 type={type}
//                 name={name}
//                 value={book[name]}
//                 onChange={handleChange}
//                 required
//                 min={min}
//                 className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent placeholder-transparent focus:outline-none focus:border-red-700 peer"
//                 placeholder={label}
//               />
//               <label className="absolute left-3 top-2 text-sm text-red-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
//                 {label}
//               </label>
//             </div>
//           ))}
//           <div className="relative">
//             <select
//               name="condition"
//               value={book.condition}
//               onChange={handleChange}
//               className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent focus:outline-none focus:border-red-700"
//             >
//               <option value="New">New</option>
//               <option value="Good">Good</option>
//               <option value="Fair">Fair</option>
//               <option value="Old">Old</option>
//             </select>
//             <label className="absolute left-3 top-2 text-sm text-red-500">Condition</label>
//           </div>
//         </div>

//         <div className="relative">
//           <textarea
//             name="description"
//             value={book.description}
//             onChange={handleChange}
//             className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent placeholder-transparent focus:outline-none focus:border-red-700 peer"
//             placeholder="Description"
//           ></textarea>
//           <label className="absolute left-3 top-2 text-sm text-red-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
//             Description
//           </label>
//         </div>

//         <div className="flex items-center space-x-4">
//           <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent" />
//         </div>

//         <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700">
//           Add Book
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;






import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: 0,
    condition: "New",
    schoolName: "",
    schoolCity: "",
    donatedBy: "",
    quantity: 1,
    description: "",
    imageUrl: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: name === "publishedYear" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "IkshaFoundation");

        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duc30mkz8/image/upload", formData);
        imageUrl = uploadRes.data.secure_url;
      }

      const bookData = { ...book, imageUrl };
      await axios.post("http://localhost:5000/books/postbooks", bookData);

      alert("Book added successfully!");
      setBook({
        title: "",
        author: "",
        genre: "",
        publishedYear: 0,
        condition: "New",
        schoolName: "",
        schoolCity: "",
        donatedBy: "",
        quantity: 1,
        description: "",
        imageUrl: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center text-black mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "title", type: "text", label: "Title" },
            { name: "author", type: "text", label: "Author" },
            { name: "genre", type: "text", label: "Genre" },
            { name: "publishedYear", type: "number", label: "Published Year" },
            { name: "schoolName", type: "text", label: "School Name" },
            { name: "schoolCity", type: "text", label: "School City" },
            { name: "donatedBy", type: "text", label: "Donated By" },
            { name: "quantity", type: "number", label: "Quantity", min: 1 },
          ].map(({ name, type, label, min }) => (
            <div key={name} className="relative">
              <input
                type={type}
                name={name}
                value={book[name]}
                onChange={handleChange}
                required
                min={min}
                className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent focus:outline-none focus:border-red-700 peer"
              />
              <span className="absolute left-3 -top-3 bg-white px-2 text-sm text-red-500">{label}</span>
            </div>
          ))}
          <div className="relative">
            <select
              name="condition"
              value={book.condition}
              onChange={handleChange}
              className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent focus:outline-none focus:border-red-700"
            >
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Old">Old</option>
            </select>
            <span className="absolute left-3 -top-3 bg-white px-2 text-sm text-red-500">Condition</span>
          </div>
        </div>

        <div className="relative">
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent focus:outline-none focus:border-red-700 peer"
          ></textarea>
          <span className="absolute left-3 -top-3 bg-white px-2 text-sm text-red-500">Description</span>
        </div>

        <div className="flex items-center space-x-4">
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-red-500 rounded-md text-black bg-transparent" />
        </div>

        <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
