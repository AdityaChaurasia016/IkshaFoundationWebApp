import React, { useState, useEffect } from 'react';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea('');
    setSelectedSchool(null);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedSchool(null);
  };

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };

  const getAreas = () => {
    const cityData = data.find((city) => city.city === selectedCity);
    return cityData ? cityData.areas.map((area) => area.name) : [];
  };

  const getSchools = () => {
    const cityData = data.find((city) => city.city === selectedCity);
    if (!cityData) return [];
    const areaData = cityData.areas.find((area) => area.name === selectedArea);
    return areaData ? areaData.schools : [];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-[#7F1D1D] mb-6">School Collaboration Platform</h1>
      <div className="w-11/12 md:w-3/4 bg-white p-6 shadow-lg rounded-lg flex">
        <div className="w-1/3 pr-4">
          <label className="block mb-4">
            <span className="text-[#7F1D1D]">Select City</span>
            <select
              className="mt-1 block w-full rounded-md border-[#7F1D1D] shadow-sm"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">-- Select City --</option>
              {data.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </label>
          {selectedCity && (
            <label className="block mb-4">
              <span className="text-[#7F1D1D]">Select Area</span>
              <select
                className="mt-1 block w-full rounded-md border-[#7F1D1D] shadow-sm"
                value={selectedArea}
                onChange={handleAreaChange}
              >
                <option value="">-- Select Area --</option>
                {getAreas().map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="w-2/3 pl-4">
          {selectedCity && selectedArea && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-[#7F1D1D] mb-4">Schools</h2>
              <ul className="space-y-2">
                {getSchools().map((school, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-[#7F1D1D] hover:text-white transition-colors"
                    onClick={() => handleSchoolClick(school)}
                  >
                    {school.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedSchool && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-[#7F1D1D] mb-4">{selectedSchool.name}</h2>
              <p className="mb-2 text-gray-700">Location: {selectedSchool.location}</p>
              <p className="mb-2 text-gray-700">Year of Establishment: {selectedSchool.year}</p>
              <p className="mb-2 text-gray-700">Number of Students: {selectedSchool.students}</p>
              <h3 className="text-lg font-semibold text-[#7F1D1D] mt-4">Resources:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {selectedSchool.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Image section at the bottom */}
      {selectedSchool && selectedSchool.images && (
        <div className="mt-8 w-11/12 md:w-3/4 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-[#7F1D1D]">Images:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {selectedSchool.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={selectedSchool.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
