const asyncHandler = require("express-async-handler");
const Budget = require("../models/budgetModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const budgetController = {
    createBudget: asyncHandler(async (req, res) => {
        const { category, limit, frequency, startDate,spent } = req.body;
        const userId = req.user.id;
        const user=await User.findById(userId)
        
        if(!user.subscribed){
            throw new Error("User needs to subscribe to set Budget")
        }

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


        const createdBudget = await budget.save();
        if (!createdBudget) {
            throw new Error("Error saving budget");
        }

        res.send("Budget created successfully");
    }),

    getBudgets: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const budgets = await Budget.find({ user: userId });

        if (!budgets || budgets.length === 0) {
            return res.send("No budgets found");
        }

        res.json(budgets);
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
