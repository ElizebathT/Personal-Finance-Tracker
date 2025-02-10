const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const Budget = require("../models/budgetModel");
const Notification = require("../models/notificationModel");

const expenseController = {
    addExpense: asyncHandler(async (req, res) => {
        const { amount, category, date, description, isRecurring, recurrenceInterval } = req.body;
        const userId = req.user.id;
    
        if (!amount || !category || !date) {
            throw new Error("Amount, category, and date are required.");
        }
    
        let nextDueDate = null;
        if (isRecurring && recurrenceInterval) {
            const startDate = new Date(date);
            switch (recurrenceInterval) {
                case "daily":
                    nextDueDate = new Date(startDate.setDate(startDate.getDate() + 1));
                    break;
                case "weekly":
                    nextDueDate = new Date(startDate.setDate(startDate.getDate() + 7));
                    break;
                case "monthly":
                    nextDueDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
                    break;
                case "yearly":
                    nextDueDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
                    break;
                default:
                    throw new Error("Invalid recurrence interval.");
            }
        }
    
        const expense = new Expense({
            user: userId,
            amount,
            category,
            date,
            description: description || '',
            isRecurring: isRecurring || false,
            recurrenceInterval: isRecurring ? recurrenceInterval : null,
            nextDueDate,
        });
    
        if (req.file) {
            expense.receiptUrl = req.file.path;
        }
    
        const savedExpense = await expense.save();
        if (!savedExpense) {
            throw new Error("Error saving expense.");
        }
    
        // Find the latest active budget for this category
        const budget = await Budget.findOne({
            user: userId,
            category,
            startDate: { $lte: new Date(date) },
            endDate: { $gte: new Date(date) }
        });
    
        if (budget) {
            // Update spent amount in budget
            budget.spent = (budget.spent || 0) + amount;
            await budget.save();
    
            const spendingPercentage = (budget.spent / budget.limit) * 100;
            if (spendingPercentage >= 80) {
                await Notification.create({
                    user: budget.user,
                    message: `🔔 Warning: You're at ${spendingPercentage.toFixed(1)}% of your budget for ${budget.category}.`,
                });
            }
        }
    
        res.send({ message: "Expense saved successfully.", expense: savedExpense });
    }),
    

    getExpense: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const expenses = await Expense.find({ user: userId });

        if (!expenses.length) {
            res.send({ message: "No expenses found." });
        }

        res.send(expenses);
    }),

    updateExpense: asyncHandler(async (req, res) => {
        const { id, amount, category, date, isRecurring, recurrenceInterval } = req.body;
        const userId = req.user.id;
    
        const expense = await Expense.findById(id);
        if (!expense) {
            throw new Error("Expense record not found.");
        }
    
        // Find and adjust previous budget
        const prevBudget = await Budget.findOne({
            user: userId,
            category: expense.category,
            startDate: { $lte: new Date(expense.date) },
            endDate: { $gte: new Date(expense.date) }
        });
    
        if (prevBudget) {
            prevBudget.spent = Math.max(0, prevBudget.spent - expense.amount);
            await prevBudget.save();
        }
    
        // Calculate nextDueDate if expense is recurring
        let nextDueDate = expense.nextDueDate;
        if (isRecurring && recurrenceInterval) {
            const startDate = new Date(date || expense.date);
            switch (recurrenceInterval) {
                case "daily":
                    nextDueDate = new Date(startDate.setDate(startDate.getDate() + 1));
                    break;
                case "weekly":
                    nextDueDate = new Date(startDate.setDate(startDate.getDate() + 7));
                    break;
                case "monthly":
                    nextDueDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
                    break;
                case "yearly":
                    nextDueDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
                    break;
                default:
                    throw new Error("Invalid recurrence interval.");
            }
        } else {
            nextDueDate = null;
        }
    
        // Update the expense record
        const updatedExpense = await Expense.findByIdAndUpdate(
            id, 
            { amount, category, date, isRecurring, recurrenceInterval, nextDueDate }, 
            { new: true }
        );
    
        if (!updatedExpense) {
            throw new Error("Error updating expense.");
        }
    
        // Find and update the new budget
        const newBudget = await Budget.findOne({
            user: userId,
            category,
            startDate: { $lte: new Date(updatedExpense.date) },
            endDate: { $gte: new Date(updatedExpense.date) }
        });
    
        if (newBudget) {
            newBudget.spent = (newBudget.spent || 0) + amount;
            await newBudget.save();
    
            const spendingPercentage = (newBudget.spent / newBudget.limit) * 100;
            if (spendingPercentage >= 80) {
                await Notification.create({
                    user: newBudget.user,
                    message: `🔔 Warning: You're at ${spendingPercentage.toFixed(1)}% of your budget for ${newBudget.category}.`,
                });
            }
        }
    
        res.send({ message: "Expense updated successfully.", expense: updatedExpense });
    }),
    

    deleteExpense: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const expense = await Expense.findById(id);
        if (!expense) {
            throw new Error("Expense record not found.");
        }

        // Find the budget related to the expense
        const budget = await Budget.findOne({
            user: req.user.id,
            category: expense.category,
            startDate: { $lte: new Date(expense.date) },
            endDate: { $gte: new Date(expense.date) }
        });

        if (budget) {
            budget.spent = Math.max(0, budget.spent - expense.amount);
            await budget.save();
        }

        await Expense.deleteOne({ _id: id });
        res.send({ message: "Expense record deleted successfully." });
    }),

    getExpensesByCategory: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { category, startDate, endDate } = req.body;

        if (!category) {
            throw new Error("Category is required.");
        }

        const filter = { user: userId, category };

        if (startDate && endDate) {
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const expenses = await Expense.find(filter);

        if (!expenses.length) {
            return res.send({ message: "No expenses found for this category." });
        }

        res.send(expenses);
    })
};

module.exports = expenseController;
