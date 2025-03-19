const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const budgetController = require("../controllers/budgetController");
const twilioClient = require("../middlewares/twilio");
const budgetRoutes = express.Router();

budgetRoutes.post("/add",userAuthentication,budgetController.createBudget);
budgetRoutes.get("/viewall",userAuthentication,budgetController.getBudgets);
budgetRoutes.put("/update",userAuthentication, twilioClient,budgetController.updateBudget);
budgetRoutes.delete("/delete/:id",userAuthentication,budgetController.deleteBudget);

module.exports = budgetRoutes;
