const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const expenseController = require("../controllers/expenseController");
const expenseRoutes = express.Router();
const  upload  = require("../middlewares/cloudinary");

expenseRoutes.post("/add",upload.single("receiptUrl"),userAuthentication,expenseController.addExpense);
expenseRoutes.get("/viewall",userAuthentication,expenseController.getExpense);
expenseRoutes.put("/update",userAuthentication,expenseController.updateExpense);
expenseRoutes.delete("/delete",userAuthentication,expenseController.deleteExpense);
expenseRoutes.get("/categories",userAuthentication,expenseController.getExpensesByCategory);

module.exports = expenseRoutes;
