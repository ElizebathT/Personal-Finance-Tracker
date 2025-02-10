const asyncHandler = require("express-async-handler");
const Income = require("../models/incomeModel");
const Savings = require("../models/savingModel");

const incomeController={
    addIncome: asyncHandler(async (req, res) => {
        const { amount, category, date, description, savings_goal  } = req.body;
        const userId = req.user.id;
        const income = new Income({
            user: userId,
            amount,
            category,
            date,
            description:description||'',
        });
        if (savings_goal) {
            const savingsGoal = await Savings.findOne({title:savings_goal});
            if (savingsGoal) {
                income.savings_goal=savingsGoal.id
                savingsGoal.savedAmount = (savingsGoal.savedAmount || 0) + amount;
                savingsGoal.progress = ((savingsGoal.savedAmount / savingsGoal.goalAmount) * 100).toFixed(2);
                await savingsGoal.save();
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
            }
        }
        const savedIncome = await income.save();
        if(!savedIncome)
        {
            res.send("Error saving income")
        }
        
        res.send("Income saved successfully");
    }),

    // Get User's Income Records
    getIncome: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const incomes = await Income.find({ user: userId });
        if(incomes.length==0)
            {
                res.send("No income found")
            }
        res.send(incomes);
    }),

    // Update Income Entry
    updateIncome : asyncHandler(async (req, res) => {
        const { id } = req.body;
        const income = await Income.findById(id);

        if (!income) {
            throw new Error("Income record not found");
        }
        const updatedIncome = await Income.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedIncome) {
            throw new Error("Error in updating income");
        }
        if(updatedIncome.savings_goal){
            const savingsGoal = await Savings.findOne({savings_goal:updatedIncome.savings_goal});
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
        }
        res.send(updatedIncome);
    }),

    // Delete Income Entry
    deleteIncome : asyncHandler(async (req, res) => {
        const { id } = req.body;
        const income = await Income.findById(id);

        if (!income) {
            throw new Error("Income record not found");
        }
        if(income.savings_goal){
            const savingsGoal = await Savings.findOne({savings_goal:income.savings_goal});
            if(savingsGoal){
                savingsGoal.savedAmount=Math.max(0,savingsGoal.savedAmount-income.amount)
                await savingsGoal.save()
            }
        }
        await Income.deleteOne({_id:id});
        res.send("Income record deleted successfully");
    }),

    getIncomeByCategory: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { category } = req.body;

        if (!category) {
            throw new Error("Category is required.");
        }

        const filter = { user: userId, category };

        const incomeRecords = await Income.find(filter);

        if (!incomeRecords.length) {
            res.send( "No income records found for this category." );
        }

        res.send(incomeRecords);
    })
}
module.exports = incomeController;
