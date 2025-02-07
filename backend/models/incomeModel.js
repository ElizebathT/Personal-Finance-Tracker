const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  amount: { 
    type: Number,
    required:true
  },
  category: { 
    type: String,
    required:true
  },
  date: { 
    type: Date,
    required:true
  },
  description: { 
    type: String},
});


const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
