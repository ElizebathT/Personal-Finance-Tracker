const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const budgetController = require("../controllers/budgetController");
const budgetRoutes = express.Router();

budgetRoutes.post("/add",userAuthentication,budgetController.createBudget);
budgetRoutes.get("/viewall",userAuthentication,budgetController.getBudgets);
budgetRoutes.put("/update",userAuthentication,budgetController.updateBudget);
budgetRoutes.delete("/delete",userAuthentication,budgetController.deleteBudget);

module.exports = budgetRoutes;
