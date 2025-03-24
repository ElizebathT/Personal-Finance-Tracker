const asyncHandler = require("express-async-handler");
const Savings = require("../models/savingModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const checkSubscription = (user, feature) => {
    
    if (user.subscriptionExpiry && user.subscriptionExpiry < new Date()) {
        throw new Error("Subscription expired. Renew to continue.");
    }
    if (feature === "savings" && user.plan === "free") {
        return Savings.countDocuments({ user: user.id }).then(count => {
            if (count >= 1) throw new Error("Free users can only have 1 savings goal");
        });
    }
};

// Create a savings goal
const savingsController={
    setSavingsGoal : asyncHandler(async (req, res) => {
    const { goalAmount, savedAmount, targetDate,title } = req.body;
    const user=req.user.id
    await checkSubscription(user, "savings");
    const savingsGoal = new Savings({
        user: req.user.id,
        goalAmount,
        title,
        savedAmount: savedAmount || 0,
        targetDate,
        progress: savedAmount ? (savedAmount / goalAmount) * 100 : 0,
    });
    await Notification.create({
        user: user,
        message: `🔔 Savings added successfully`,
    });
    const createdGoal = await savingsGoal.save();
    if(!createdGoal){
        throw new Error("Error creating savings")
    }
    res.send("Savings goal saved successfully");
}),

// Get all savings goals
getSavingsGoals: asyncHandler(async (req, res) => {
    const savingsGoals = await Savings.find({ user: req.user.id });

    if (savingsGoals.length === 0) {
        return res.status(404).json({ message: "No savings goals found" });
    }

    res.status(200).json(savingsGoals);
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
        const messageBody = `🎉 Congratulations! You've reached your savings goal of ${savingsGoal.goalAmount}.`;
        
        const client=req.client
                    const user=await User.findById(savingsGoal.user) 
                        if (user.phone) {
                            const number="+91"+user.phone
                            await client.messages.create({
                                body: messageBody,
                                from: req.number,
                                to: number,
                            });
                        }
    } else if (progress >= 80) {
        await Notification.create({
            user: savingsGoal.user,
            message: `🔔 You're almost there! ${progress.toFixed(1)}% of your savings goal is completed.`,
        });
        const messageBody = `🔔 You're almost there! ${progress.toFixed(1)}% of your savings goal is completed.`;
        
        const client=req.client
                    const user=await User.findById(savingsGoal.user) 
                        if (user.phone) {
                            const number="+91"+user.phone
                            await client.messages.create({
                                body: messageBody,
                                from: req.number,
                                to: number,
                            });
                        }
    } else if (progress >= 50) {
        await Notification.create({
            user: savingsGoal.user,
            message: `🌱 Halfway there! You've saved ${progress.toFixed(1)}% of your goal.`,
        });
        const messageBody = `🌱 Halfway there! You've saved ${progress.toFixed(1)}% of your goal.`;
        
        const client=req.client
                    const user=await User.findById(savingsGoal.user) 
                        if (user.phone) {
                            const number="+91"+user.phone
                            await client.messages.create({
                                body: messageBody,
                                from: req.number,
                                to: number,
                            });
                        }
    }
    res.send("Savings goal updated successfully");
}),

// Delete a savings goal
deleteSavingsGoal : asyncHandler(async (req, res) => {
    const {id } = req.params;
    const savingsGoal = await Savings.findById(id)

    if (!savingsGoal) {
        throw new Error("Savings goal not found");
    }
    await savingsGoal.deleteOne();
    res.send( "Savings goal deleted successfully" );
}),
}
module.exports = savingsController
