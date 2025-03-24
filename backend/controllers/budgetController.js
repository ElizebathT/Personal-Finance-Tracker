const asyncHandler = require("express-async-handler");
const Budget = require("../models/budgetModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const checkSubscription = (user, feature) => {
    if (user.subscriptionExpiry && user.subscriptionExpiry < new Date()) {
        throw new Error("Subscription expired. Renew to continue.");
    }
    if (feature === "budget" && user.plan === "free") {
        return Budget.countDocuments({ user: user.id }).then(count => {
            if (count >= 1) throw new Error("Free users can only have 1 budget");
        });
    }
};

const budgetController = {
    createBudget: asyncHandler(async (req, res) => {
        const { category, limit, frequency, startDate,spent } = req.body;
        const userId = req.user.id;
        const user=await User.findById(userId)
        await checkSubscription(user, "budget");
        
        const existingBudget = await Budget.findOne({
            user: userId,
            category,
            frequency,
            startDate,
            spent
        });

        if (existingBudget) {
            throw new Error("Budget for this category and period already exists");
        }
        
        let endDate;
        switch (frequency) {
            case "weekly":
                endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 6);
                break;
            case "monthly":
                endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);
                endDate.setDate(0);
                break;
            case "yearly":
                endDate = new Date(startDate);
                endDate.setFullYear(endDate.getFullYear() + 1);
                endDate.setDate(0);
                break;
            default:
                throw new Error("Invalid frequency. Choose 'weekly', 'monthly', or 'yearly'.");
        }
       ;
        const budget = new Budget({
            user: userId,
            category,
            limit,
            spent,
            frequency,
            startDate,
            endDate
        });
        await Notification.create({
                user: user,
                message: `🔔 Budget added successfully`,
            });

        const createdBudget = await budget.save();
        if (!createdBudget) {
            throw new Error("Error saving budget");
        }

        res.send("Budget created successfully");
    }),

    getBudgets: asyncHandler(async (req, res) => {
        const budgets = await Budget.find({ user: req.user.id });
    
        if (!budgets || budgets.length === 0) {
            return res.status(404).json({ message: "No budgets found" });
        }
    
        res.status(200).json(budgets);
    }),  

    updateBudget: asyncHandler(async (req, res) => {
        const { id, category, limit, spent } = req.body;

        const budget = await Budget.findById(id);
        if (!budget) {
            throw new Error("Budget not found");
        }

        budget.category = category || budget.category;
        budget.limit = limit || budget.limit;
        budget.spent = spent || budget.spent;

        const updatedBudget = await budget.save();
        if (!updatedBudget) {
            throw new Error("Error updating budget");
        }

        const spendingPercentage = (budget.spent / budget.limit) * 100;
        if (spendingPercentage >= 80) {
            await Notification.create({
                user: budget.user,
                message: `🔔 Warning: You're at ${spendingPercentage.toFixed(1)}% of your budget for ${budget.category}.`,
            });
            const messageBody = `🔔 Warning: You're at ${spendingPercentage.toFixed(1)}% of your budget for ${budget.category}.`;
            const client=req.client
            const user=await User.findById(budget.user) 
                if (user.phone) {
                    const number="+91"+user.phone
                    await client.messages.create({
                        body: messageBody,
                        from: req.number,
                        to: number,
                    });
                }
        }
        
        res.send("Budget updated successfully");
    }),

    deleteBudget: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const budget = await Budget.findById(id);
        if (!budget) {
            throw new Error("Budget not found");
        }

        await budget.deleteOne();
        res.send("Budget deleted successfully");
    })
};

module.exports = budgetController;
