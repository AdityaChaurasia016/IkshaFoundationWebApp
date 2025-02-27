require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors= require('cors');


// Import the School model
const School = require('./models/schools');

const app = express();
const schoolRoutes = require("./routes/schoolRoutes"); 

app.use(express.json());

// app.use(cors());
// http://localhost:5173
app.use(cors({ origin: "https://iksha-foundation-web-app-frontend.vercel.app/", credentials: true }));



app.use("/api", schoolRoutes);

const bookRoutes = require("./bookoperations/bookroute")

app.use("/books", bookRoutes)



// Initialize express app


// MongoDB Connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

// Overpass API URL for government schools in Bangalore
const OVERPASS_URL = `https://overpass-api.de/api/interpreter`;
const QUERY = `[out:json];
area["name"="Bengaluru"]->.searchArea;
(
  node["amenity"="school"](area.searchArea);
  way["amenity"="school"](area.searchArea);
  relation["amenity"="school"](area.searchArea);
);
out center;`;




// Fetch Schools and Store in MongoDB
app.get('/fetch-schools', async (req, res) => {
  try {
    const response = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(QUERY)}`);
    const schools = response.data.elements.map((el) => ({
      osm_id: el.id,
      name: el.tags.name || 'Unknown',
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,
      address: el.tags['addr:full'] || 'Address not available',
      type: el.tags['school:level'] || 'Unknown',
      operator: el.tags.operator || 'Private',
      website: el.tags.website || 'Not available',
      contact: el.tags.phone || 'Not available',
      email: el.tags.email || 'Not available',
      visited: false
    }));
    

    await School.insertMany(schools);
    res.json({ message: 'Schools data stored successfully', count: schools.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch schools', err: error.message });
  }
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
