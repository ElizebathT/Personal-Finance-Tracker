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
phone:{
  type:Number,
  // unique:true
},
  password: { 
    type: String
},
  });

const User = mongoose.model("User", UserSchema);
module.exports = User;
