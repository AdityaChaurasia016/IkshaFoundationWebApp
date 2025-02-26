import { useEffect, useState } from "react";
import axios from "axios";

const SchoolsList = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/schools");
        setSchools(res.data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };
    fetchData();
  }, []);
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">School List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.map((school) => (
          <div key={school.osm_id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{school.name}</h3>
            <p><strong>Address:</strong> {school.address}</p>
            <p><strong>Type:</strong> {school.type}</p>
            <p><strong>Operator:</strong> {school.operator}</p>
            <p><strong>Website:</strong> {school.website}</p>
            <p><strong>Contact:</strong> {school.contact}</p>
            <p><strong>Email:</strong> {school.email}</p>
            <p><strong>Visited:</strong> {school.visited ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolsList;

