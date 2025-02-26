const mongoose = require("mongoose");

const schoolDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  address: { type: String },  // Formatted address from OpenCage
  city: { type: String },
  district: { type: String },
  state: { type: String },
  country: { type: String },
  postcode: { type: String },
  operator: { type: String }
});

module.exports = mongoose.model("SchoolDetails", schoolDetailsSchema);