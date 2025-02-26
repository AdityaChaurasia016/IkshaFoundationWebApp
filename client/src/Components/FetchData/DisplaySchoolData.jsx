// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import {Link} from 'react-router-dom'
// import { FaArrowRightLong } from "react-icons/fa6";


// const DisplaySchoolData = () => {
//   const [schoolData, setSchoolData] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/schoolDetails?page=${page}`
//       );
//       setSchoolData(response.data.Schooldata);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page]);

//   return (
//     <>
//     <div>
//       <Link to='/books'>
//       <div className="bg-red-900 rounded-md border m-5 p-4 px-5 flex items-center justify-between hover:bg-red-700 transition duration-500">
//       <p className="text-3xl text-white">Book Management System</p>
//       <FaArrowRightLong color={'white'} size={30} className="mr-6"/>
//       </div>
//       </Link>
//     </div>
//     <div className="p-4 space-y-4">
//       {schoolData.map((school, index) => (
//         <div key={index} className="flex border rounded-lg shadow-md p-4 bg-white">
//           {/* School Details */}
//           <div className="w-1/2 p-4">
//             <h2 className="text-xl font-bold mb-5">{school.name}</h2>
//             <p className="text-gray-600 mb-2">Address: {school.address}</p>
//             <p className="text-gray-600">City: {school.city}</p> 
//             <p className="text-gray-600">State: {school.state}</p>
//           </div>

//           {/* Map Display */}
//           <div className="w-1/2 h-64">
//             <MapContainer
//               center={[school.lat, school.lon]}
//               zoom={13}
//               style={{ height: "100%", width: "100%" }}
//             >
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               <Marker position={[school.lat, school.lon]}>
//                 <Popup>{school.name}</Popup>
//               </Marker>
//             </MapContainer>
//           </div>
//         </div>
//       ))}

//       {/* Pagination Controls */}
//       <div className="flex justify-center space-x-4 mt-4">
//         <button
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => setPage((prev) => prev + 1)}
//           className="px-4 py-2 bg-red-900 text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default DisplaySchoolData;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const DisplaySchoolData = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/schoolDetails?page=${page}&search=${search}`
      );
      setSchoolData(response.data.Schooldata);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch only when the page changes
  }, [page]); // Remove `search` dependency


  return (
    <>
      {/* Book Management Link */}
      <div>
        <Link to='/books'>
          <div className="bg-red-900 rounded-md border m-5 p-4 px-5 flex items-center justify-between hover:bg-red-700 transition duration-500">
            <p className="text-3xl text-white">Book Management System</p>
            <FaArrowRightLong color={'white'} size={30} className="mr-6" />
          </div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search by Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-l-md"
        />
        {/* <button
          onClick={fetchData}
          className="bg-red-900 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
        >
          Search
        </button> */}
        <button
          onClick={() => {
            setPage(1); // Reset to first page on search
            fetchData();
          }}
          className="bg-red-900 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
        >
          Search
        </button>
      </div>

      {/* School Data Display */}
      <div className="p-4 space-y-4">
        {schoolData.map((school, index) => (
          <div key={index} className="flex border rounded-lg shadow-md p-4 bg-white">
            {/* School Details */}
            <div className="w-1/2 p-4">
              <h2 className="text-xl font-bold mb-5">{school.name}</h2>
              <p className="text-gray-600 mb-2">Address: {school.address}</p>
              <p className="text-gray-600">City: {school.city}</p>
              <p className="text-gray-600">State: {school.state}</p>
            </div>

            {/* Map Display */}
            <div className="w-1/2 h-64">
              <MapContainer
                center={[school.lat, school.lon]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[school.lat, school.lon]}>
                  <Popup>{school.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-red-900 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplaySchoolData;
