const express = require("express");
const School = require("../models/schools");
const router = express.Router();
const axios = require("axios");
const SchoolDetails = require("../models/schoolDetailsSchema");


// GET all schools (excluding lat & lon)
router.get("/schools", async (req, res) => {
  try {
    const schools = await School.find({});
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});





const OPEN_CAGE_API_KEY = process.env.OPEN_CAGE_API_KEY;
const OPEN_CAGE_URL = "https://api.opencagedata.com/geocode/v1/json";

// Fetch & Store School Details
router.get("/fetch-opencage", async (req, res) => {
  try {
    const schools = await School.find(); // Get all schools

    for (const school of schools) {
      // Check if details already exist
      const existingEntry = await SchoolDetails.findOne({ name: school.name });
      if (existingEntry) continue;

      // Call OpenCage API
      const response = await axios.get(OPEN_CAGE_URL, {
        params: {
          q: school.name,
          key: OPEN_CAGE_API_KEY,
        },
      });

      const data = response.data.results[0];
      if (!data) continue;

      // Extract relevant details
      const details = {
        name: school.name,
        lat: school.lat,
        lon: school.lon,
        address: data.formatted || "Not available",
        city: data.components.city || "Unknown",
        district: data.components.suburb || "Unknown",
        state: data.components.state || "Unknown",
        country: data.components.country || "Unknown",
        postcode: data.components.postcode || "Unknown",
        operator: school.operator || "Unknown",
      };

      // Save to database
      await SchoolDetails.create(details);
    }

    res.json({ message: "School details fetched & stored successfully" });
  } catch (error) {
    console.error("Error fetching data from OpenCage:", error);
    res.status(500).json({ error: "Failed to fetch data", msg:error.message });
  }
});


// router.get("/schoolDetails",async(req,res)=>{
//   try{
//     const Schooldata= await SchoolDetails.find({ $nor:[{name:"Unknown"},{address: "Unknown"} , {city: "Unknown"}  , {state: "Unknown"}]})
//     res.status(200).json({Schooldata})
//   }
//   catch(error){
//     res.status(500).json({msg:"Server Error", error: error.message})
//   }
// })


// router.get("/schoolDetails", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Default to page 1
//     const limit = 20; // 20 maps per page
//     const skip = (page - 1) * limit; // Skip previous pages
    
//     const Schooldata = await SchoolDetails.find({
//       $nor: [{ name: "Unknown" }, { address: "Unknown" }, { city: "Unknown" }, { state: "Unknown" }],
//       $or: [{city: "Bengaluru"}],
//       address: { $regex: /(School|Academy|Convent)/i }
//     })
//     .skip(skip)
//     .limit(limit);

//     res.status(200).json({ Schooldata });
//   } catch (error) {
//     res.status(500).json({ msg: "Server Error", error: error.message });
//   }
// });

router.get("/schoolDetails", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const search = req.query.search || ""; // Search query
    const limit = search ? 50 : 20; // 50 results when searching, else 20
    const skip = (page - 1) * limit; // Skip previous pages

    const query = {
      $nor: [{ name: "Unknown" }, { address: "Unknown" }, { city: "Unknown" }, { state: "Unknown" }],
      city: "Bengaluru", // Ensures all results belong to Bengaluru
      address: { $regex: /(School|Academy|Convent)/i } // Matches common school terms
    };    

    // if (search) {
    //   query.$or.push({ name: { $regex: search, $options: "i" } });
    //   query.$or.push({ address: { $regex: search, $options: "i" } });
    // }
    if (search) {
      query.address = { $regex: search, $options: "i" }; // Overrides address search when input is given
    }

    const Schooldata = await SchoolDetails.find(query).skip(skip).limit(limit);

    res.status(200).json({ Schooldata });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});




module.exports = router;