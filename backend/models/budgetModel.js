const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
  category: { 
    type:String,
  },
  limit: { 
    type:Number,
  },
  spent: { 
    type:Number
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
