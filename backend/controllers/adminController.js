const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

const adminController={
    getDashboardData :asyncHandler(async (req, res) => {
        console.log('pp');
        
        const users = await User.find();
        const transactions=await Transaction.find()
        const dashboard = {
            users,
            transactions
          };
      console.log(dashboard);
      
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