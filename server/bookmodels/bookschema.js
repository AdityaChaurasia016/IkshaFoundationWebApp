const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    title:{type: String, required: true},
    author:{type:String, required:true},
    genre:{type: String},
    publishedYear:{type:Number},
    condition:{type:String, enum:['New','Good','Fair','Old'], required:true},
    schoolName:{type: String, required:true},
    schoolCity:{type:String, required:true},
    donatedBy:{type: String, required: true},
    quantity:{type: Number, default: 1 },
    description:{type: String},
    imageUrl: { type: String },
    createdAt:{type: Date, default: Date.now }
})

module.exports = mongoose.model("Book", BookSchema);