const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
dob:{
  type:Date,
},
phone:{
  type: String, 
    required: true 
},
role: { 
  type: String, 
  enum: ["individual","admin"], 
  default: "individual" 
},
  password: { 
    type: String
},
verified:{
  type:Boolean,
  default:false
},
currencyPreference:{
  type: String
},
subscribed:{
  type:Boolean,
  default:false
},
plan: {
  type: String,
  enum: ["basic", "premium","vip"],
  required: function () {
    return this.paymentType === "subscription";
  },
},
subscriptionExpiry: {
  type: Date,
},
  });

const User = mongoose.model("User", UserSchema);
module.exports = User;
