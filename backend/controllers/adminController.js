const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

const adminController={
  getDashboardData: asyncHandler(async (req, res) => {
    try {
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2); // Get the date 2 months ago

        // Find transactions in the last 2 months
        const recentTransactions = await Transaction.find({
            date: { $gte: twoMonthsAgo }
        });

        // Extract unique user IDs from those transactions
        const activeUserIds = [...new Set(recentTransactions.map(tx => tx.user))];

        // Find active users who had at least one transaction in the last 2 months
        const activeUsers = await User.find({ _id: { $in: activeUserIds } });

        // Fetch all users and transactions (if needed)
        const users = await User.find();
        const transactions = await Transaction.find();

        const dashboard = {
            users,
            transactions,
            activeUsers, // Add active users here
        };

        res.send(dashboard);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}),

      
    verifyUser:asyncHandler(async (req, res) => {
      
        const user = await User.findById(req.params.id);
        
        if(!user){
            throw new Error('User not found')
        }
        user.verified=true
        const userSaved=await user.save()
        res.send("User verified")
    }),
}
module.exports=adminController