const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  osm_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  name_kn: { type: String },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  address: { type: String },
  visited: { type: Boolean, default: false }
});

module.exports = mongoose.model("School", schoolSchema);
