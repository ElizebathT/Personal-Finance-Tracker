const asyncHandler = require("express-async-handler");
const Budget = require("../models/budgetModel");

const budgetController={
    createBudget : asyncHandler(async (req, res) => {
        const { category, limit } = req.body;
        const userId = req.user.id;
        const budget = new Budget({
            user: userId,
            category,
            limit,
            spent: 0
        });    
        const createdBudget = await budget.save();
        if(!createdBudget)
        {
            throw new Error("Error saving budget")
        }
        res.send("Budget created successfully");
    }),

    getBudgets :asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const budgets = await Budget.find({ user: userId });
        if(!budgets)
            {
                res.send("No budget found")
            }
        res.send(budgets);
    }),

    updateBudget :asyncHandler(async (req, res) => {
        const { id } = req.body;
        const { category, limit, spent } = req.body;
        
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
        res.send("Budget updated successfully");
    }),

    deleteBudget :asyncHandler(async (req, res) => {
        const { id } = req.body;
        const budget = await Budget.findById(id);
        
        if (!budget) {
            throw new Error("Budget not found");
        }
        
        await budget.deleteOne();
        res.send("Budget deleted successfully" );
    })
}
module.exports=budgetController