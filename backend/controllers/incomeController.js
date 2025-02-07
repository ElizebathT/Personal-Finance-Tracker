const asyncHandler = require("express-async-handler");
const Income = require("../models/incomeModel");

const incomeController={
    addIncome: asyncHandler(async (req, res) => {
        const { amount, category, date, description } = req.body;
        const userId = req.user.id;
                const income = new Income({
            user: userId,
            amount,
            category,
            date,
            description:description||'',
        });

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
        res.send(updatedIncome);
    }),

    // Delete Income Entry
    deleteIncome : asyncHandler(async (req, res) => {
        const { id } = req.body;
        const income = await Income.findById(id);

        if (!income) {
            throw new Error("Income record not found");
        }

        await Income.deleteOne({_id:id});
        res.send("Income record deleted successfully");
    })
}
module.exports = incomeController;
