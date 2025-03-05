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
subscribed:{
  type:Boolean,
  default:false
},
  });

const User = mongoose.model("User", UserSchema);
module.exports = User;
