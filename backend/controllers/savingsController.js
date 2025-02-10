const asyncHandler = require("express-async-handler");
const Savings = require("../models/savingModel");
const Notification = require("../models/notificationModel");

// Create a savings goal
const savingsController={
    setSavingsGoal : asyncHandler(async (req, res) => {
    const { goalAmount, savedAmount, targetDate,title } = req.body;
    
    const savingsGoal = new Savings({
        user: req.user.id,
        goalAmount,
        title,
        savedAmount: savedAmount || 0,
        targetDate,
        progress: savedAmount ? (savedAmount / goalAmount) * 100 : 0,
    });

    const createdGoal = await savingsGoal.save();
    if(!createdGoal){
        throw new Error("Error creating savings")
    }
    res.send("Savings goal saved successfully");
}),

// Get all savings goals
getSavingsGoals : asyncHandler(async (req, res) => {
    const savingsGoals = await Savings.find({ user: req.user.id });
    if(!savingsGoals){
        res.send("No savings goal found")
    }
    res.send(savingsGoals);
}),

// Update a savings goal
updateSavingsGoal : asyncHandler(async (req, res) => {
    const { goalAmount, savedAmount, targetDate,title } = req.body;
    const savingsGoal = await Savings.findOne({title});

    if (!savingsGoal) {
        throw new Error("Savings goal not found");
    }

    savingsGoal.goalAmount = goalAmount || savingsGoal.goalAmount;
    savingsGoal.savedAmount = savedAmount || savingsGoal.savedAmount;
    savingsGoal.targetDate = targetDate || savingsGoal.targetDate;
    savingsGoal.progress = (savingsGoal.savedAmount / savingsGoal.goalAmount) * 100;

    const updatedGoal = await savingsGoal.save();
    if(!updatedGoal){
        throw new Error("Error updating savings")
    }
    const progress = savingsGoal.progress;

    if (progress >= 100) {
        await Notification.create({
            user: savingsGoal.user,
            message: `🎉 Congratulations! You've reached your savings goal of ${savingsGoal.goalAmount}.`,
        });
    } else if (progress >= 80) {
        await Notification.create({
            user: savingsGoal.user,
            message: `🔔 You're almost there! ${progress.toFixed(1)}% of your savings goal is completed.`,
        });
    } else if (progress >= 50) {
        await Notification.create({
            user: savingsGoal.user,
            message: `🌱 Halfway there! You've saved ${progress.toFixed(1)}% of your goal.`,
        });
    }
    res.send("Savings goal updated successfully");
}),

// Delete a savings goal
deleteSavingsGoal : asyncHandler(async (req, res) => {
    const {title } = req.body;
    const savingsGoal = await Savings.findOne({title});

    if (!savingsGoal) {
        throw new Error("Savings goal not found");
    }
    await savingsGoal.deleteOne();
    res.send( "Savings goal deleted successfully" );
}),
}
module.exports = savingsController
