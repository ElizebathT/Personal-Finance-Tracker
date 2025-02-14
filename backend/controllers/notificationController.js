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

        // Categorize spending habits
        const expenseCategories = {};
        transactions.filter(transaction => transaction.type === "expense").forEach(transaction => {
            expenseCategories[transaction.category] = (expenseCategories[transaction.category] || 0) + transaction.amount;
        });

        // Identify top spending categories
        const sortedExpenses = Object.entries(expenseCategories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Top 3 categories

        // Calculate savings percentage
        const savingsPercentage = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

        // Recommendation logic
        let recommendations = [];

        if (savingsPercentage < 20) {
            recommendations.push("Your savings rate is below 20%. Try to save at least 20% of your income.");
        }

        if (sortedExpenses.length > 0) {
            recommendations.push(`Consider reducing spending in high-cost areas like ${sortedExpenses.map(cat => cat[0]).join(", ")}.`);
        }

        if (savingsGoals.length > 0) {
            recommendations.push("You have active savings goals. Consider allocating more funds to them for faster progress.");
        } else {
            recommendations.push("You don’t have a savings goal set. Setting one can help you build financial discipline.");
        }

        res.send({
            totalIncome,
            totalExpenses,
            savingsPercentage: savingsPercentage.toFixed(2),
            topSpendingCategories: sortedExpenses,
            recommendations,
        });
    })
};

module.exports = notificationController;

// const asyncHandler = require("express-async-handler");
// const Notification = require("../models/notificationModel");
// const Income = require("../models/incomeModel");
// const Expense = require("../models/expenseModel");
// const Savings = require("../models/savingModel");


// const notificationController={
// getUserNotifications : asyncHandler(async (req, res) => {
//     const notifications = await Notification.find({ user: req.user.id }).sort({ date: -1 });
//     res.send(notifications);
// }),

// markNotificationAsRead : asyncHandler(async (req, res) => {
//     const {id}=req.body
//     const notification = await Notification.findById(id);

//     if (!notification) {
//         throw new Error("Notification not found.");
//     }

//     notification.read = true;
//     await notification.save();
//     await notification.deleteOne();
//     res.send("Notification marked as read.");
// }),

// deleteNotification : asyncHandler(async (req, res) => {
//     const {id}=req.body
//     const notification = await Notification.findById(id);

//     if (!notification) {
//         throw new Error("Notification not found.");
//     }

//     await notification.deleteOne();

//     res.send( "Notification deleted successfully.");
// }),

// generateSavingsRecommendations :asyncHandler( async (req,res) => {
//     const userId = req.user.id
//         const incomes = await Income.find({ user: userId });
//         const expenses = await Expense.find({ user: userId });
//         const savingsGoals = await Savings.find({ user: userId });

//         // Calculate total income
//         const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

//         // Calculate total expenses
//         const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

//         // Categorize spending habits
//         const expenseCategories = {};
//         expenses.forEach(expense => {
//             expenseCategories[expense.category] = (expenseCategories[expense.category] || 0) + expense.amount;
//         });

//         // Identify top spending categories
//         const sortedExpenses = Object.entries(expenseCategories)
//             .sort((a, b) => b[1] - a[1])
//             .slice(0, 3); // Top 3 categories

//         // Calculate savings percentage
//         const savingsPercentage = ((totalIncome - totalExpenses) / totalIncome) * 100;

//         // Recommendation logic
//         let recommendations = [];

//         if (savingsPercentage < 20) {
//             recommendations.push("Your savings rate is below 20%. Try to save at least 20% of your income.");
//         }

//         if (sortedExpenses.length > 0) {
//             recommendations.push(`Consider reducing spending in high-cost areas like ${sortedExpenses.map(cat => cat[0]).join(", ")}.`);
//         }

//         if (savingsGoals.length > 0) {
//             recommendations.push("You have active savings goals. Consider allocating more funds to them for faster progress.");
//         } else {
//             recommendations.push("You don’t have a savings goal set. Setting one can help you build financial discipline.");
//         }

//         res.send(
//             {totalIncome,
//             totalExpenses,
//             savingsPercentage: savingsPercentage.toFixed(2),
//             topSpendingCategories: sortedExpenses,
//             recommendations}
//         );
// })
// }
// module.exports = notificationController
