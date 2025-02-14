const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const adminController={
    getDashboardData :asyncHandler(async (req, res) => {
          const userCount = await User.find();
      
          const dashboard = {
            userCount,
          };
      
          res.send(dashboard);
        
      }),
      
    verifyUser:asyncHandler(async (req, res) => {
        const {email}=req.body
        const user= await User.findOne({email})
        if(!user){
            throw new Error('User not found')
        }
        user.verified=true
        await user.save()
        res.send("User verified")
    }),
}
module.exports=adminController