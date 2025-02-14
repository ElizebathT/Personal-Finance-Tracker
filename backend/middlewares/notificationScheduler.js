const cron = require("node-cron");
const Savings = require("../models/savingModel");
const Transaction = require("../models/transactionModel");
const Notification = require("../models/notificationModel");
const moment = require("moment");

// Schedule the job to run daily at midnight
cron.schedule("0 0 * * *", async () => {
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "day").startOf("day");

    // Fetch savings goals
    const savingsGoals = await Savings.find();
    for (const goal of savingsGoals) {
        const targetDate = moment(goal.targetDate).startOf("day");
        const progress = (goal.savedAmount / goal.goalAmount) * 100;

        if (targetDate.isSame(tomorrow)) {
            await Notification.create({
                user: goal.user,
                message: `⏳ Reminder: Your savings goal of ${goal.goalAmount} is due tomorrow!`,
            });
        }
        if (targetDate.isBefore(today) && progress < 100) {
            await Notification.create({
                user: goal.user,
                message: `⚠️ You missed your savings goal deadline! You saved ${progress.toFixed(1)}%. Consider adjusting your plan.`,
            });
        }
    }

    // Fetch upcoming recurring expenses due tomorrow
    const recurringTransactions = await Transaction.find({ 
        type: "expense", 
        isRecurring: true, 
        nextDueDate: { $eq: tomorrow.toDate() } 
    });

    for (const transaction of recurringTransactions) {
        await Notification.create({
            user: transaction.user,
            message: `💳 Reminder: Your recurring expense of $${transaction.amount} for ${transaction.category} is due tomorrow.`,
        });

        let nextDueDate = moment(transaction.nextDueDate);
        switch (transaction.recurrenceInterval) {
            case "daily":
                nextDueDate.add(1, "day");
                break;
            case "weekly":
                nextDueDate.add(1, "week");
                break;
            case "monthly":
                nextDueDate.add(1, "month");
                break;
            case "yearly":
                nextDueDate.add(1, "year");
                break;
        }
        await Transaction.findByIdAndUpdate(transaction._id, { nextDueDate: nextDueDate.toDate() });
    }
});

// const cron = require("node-cron");
// const Savings = require("../models/savingModel");
// const Expense = require("../models/expenseModel");
// const Notification = require("../models/notificationModel");
// const moment = require("moment");

// // Schedule the job to run daily at midnight
// cron.schedule("0 0 * * *", async () => {
//     const today = moment().startOf("day");
//     const tomorrow = moment().add(1, "day").startOf("day");

//     // Fetch savings goals
//     const savingsGoals = await Savings.find();
//     for (const goal of savingsGoals) {
//         const targetDate = moment(goal.targetDate).startOf("day");
//         const progress = (goal.savedAmount / goal.goalAmount) * 100;

//         if (targetDate.isSame(tomorrow)) {
//             await Notification.create({
//                 user: goal.user,
//                 message: `⏳ Reminder: Your savings goal of ${goal.goalAmount} is due tomorrow!`,
//             });
//         }
//         if (targetDate.isBefore(today) && progress < 100) {
//             await Notification.create({
//                 user: goal.user,
//                 message: `⚠️ You missed your savings goal deadline! You saved ${progress.toFixed(1)}%. Consider adjusting your plan.`,
//             });
//         }
//     }

//     // Fetch upcoming recurring expenses due tomorrow
//     const recurringExpenses = await Expense.find({ 
//         isRecurring: true, 
//         nextDueDate: { $eq: tomorrow.toDate() } 
//     });

//     for (const expense of recurringExpenses) {
//         await Notification.create({
//             user: expense.user,
//             message: `💳 Reminder: Your recurring expense of $${expense.amount} for ${expense.category} is due tomorrow.`,
//         });
//     }
//     let nextDueDate = moment(expense.nextDueDate);
//             switch (expense.recurrenceInterval) {
//                 case "daily":
//                     nextDueDate.add(1, "day");
//                     break;
//                 case "weekly":
//                     nextDueDate.add(1, "week");
//                     break;
//                 case "monthly":
//                     nextDueDate.add(1, "month");
//                     break;
//                 case "yearly":
//                     nextDueDate.add(1, "year");
//                     break;
//             }
//             await Expense.findByIdAndUpdate(expense._id, { nextDueDate: nextDueDate.toDate() });

// });
