const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
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
    type: String,
  },
  receiptUrl: { 
    type: String
  },
});


const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
