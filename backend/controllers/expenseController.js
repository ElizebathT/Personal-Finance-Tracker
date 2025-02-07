const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

const expenseController={
    addExpense: asyncHandler(async (req, res) => {
        const { amount, category, date, description } = req.body;
        const userId = req.user.id;
        const expense = new Expense({
            user: userId,
            amount,
            category,
            date,
            description:description||'',
            
        });
        if(req.file){
            expense.receiptUrl=req.file.path
        }
        const savedExpense = await expense.save();
        if(!savedExpense)
        {
            throw new Error("Error saving expense")
        }
        res.send("Expense saved successfully");
    }),

    
    getExpense: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const expenses = await Expense.find({ user: userId });
        if(expenses.length==0)
            {
                res.send("No expense found")
            }
        res.send(expenses);
    }),

    
    updateExpense : asyncHandler(async (req, res) => {
        const { id } = req.body;
        const expense = await Expense.findById(id);

        if (!expense) {
            throw new Error("Expense record not found");
        }
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedExpense) {
            throw new Error("Error in updating expense");
        }
        res.send(updatedExpense);
    }),

    
    deleteExpense : asyncHandler(async (req, res) => {
        const { id } = req.body;
        const expense = await Expense.findById(id);

        if (!expense) {
            throw new Error("Expense record not found");
        }

        await Expense.deleteOne({_id:id});
        res.send("Expense record deleted successfully");
    })
}
module.exports = expenseController;
