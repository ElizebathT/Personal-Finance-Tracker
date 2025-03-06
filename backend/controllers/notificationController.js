const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const Transaction = require("../models/transactionModel");
const Savings = require("../models/savingModel");

const notificationController = {
    getUserNotifications: asyncHandler(async (req, res) => {
        const notifications = await Notification.find({ user: req.user.id }).sort({ date: -1 });
        res.send(notifications);
    }),

    markNotificationAsRead: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const notification = await Notification.findById(id);

        if (!notification) {
            throw new Error("Notification not found.");
        }

        notification.read = true;
        await notification.save();
        await notification.deleteOne();
        res.send("Notification marked as read.");
    }),

    deleteNotification: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const notification = await Notification.findById(id);

        if (!notification) {
            throw new Error("Notification not found.");
        }

        await notification.deleteOne();
        res.send("Notification deleted successfully.");
    }),

    generateSpendingAnalysis: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const transactions = await Transaction.find({ user: userId });
    
        // Categorize spending habits
        const expenseCategories = {};
        const totalExpenses = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => {
                expenseCategories[transaction.category] = (expenseCategories[transaction.category] || 0) + transaction.amount;
                return sum + transaction.amount;
            }, 0);
    
        // Identify top spending categories
        const sortedExpenses = Object.entries(expenseCategories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Top 3 categories
    
        // Identify recurring expenses
        const recurringExpenses = transactions.filter(transaction => transaction.isRecurring && transaction.type === "expense");
    
        // Recommendation logic
        let recommendations = [];
    
        if (sortedExpenses.length > 0) {
            sortedExpenses.forEach(([category, amount]) => {
                recommendations.push(`You spent heavily on ${category} (${amount.toFixed(2)}). Consider reducing unnecessary expenses.`);
            });
        }
    
        if (recurringExpenses.length > 0) {
            recommendations.push("You have recurring expenses. Review subscriptions and automatic payments to check if any can be canceled or reduced.");
        }
    
        res.send({
            totalExpenses,
            topSpendingCategories: sortedExpenses,
            recommendations,
        });
    }),

    generateSavingsRecommendations: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const transactions = await Transaction.find({ user: userId });
        const savingsGoals = await Savings.find({ user: userId });
    
        // Calculate total income and expenses
        const totalIncome = transactions
            .filter(transaction => transaction.type === "income")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    
        const totalExpenses = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    
        // Calculate savings percentage
        const savingsPercentage = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
        // Recommendation logic
        let recommendations = [];
    
        if (savingsPercentage < 20) {
            recommendations.push("Your savings rate is below 20%. Try saving at least 20% of your income.");
        } else if (savingsPercentage > 30) {
            recommendations.push("You're saving over 30%! Consider investing or diversifying your savings.");
        }
    
        if (savingsGoals.length > 0) {
            recommendations.push("You have active savings goals. Allocate more funds to achieve them faster.");
        } else {
            recommendations.push("You don’t have a savings goal set. Setting one can help you stay financially disciplined.");
        }
    
        res.send({
            totalIncome,
            totalExpenses,
            savingsPercentage: savingsPercentage.toFixed(2),
            recommendations,
        });
    })
    
    
};

module.exports = notificationController;
