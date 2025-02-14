const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const upload = require("../middlewares/cloudinary");
const transactionController = require("../controllers/transactionControllers");

const transactionRoutes = express.Router();

transactionRoutes.post("/add", upload.single("receiptUrl"), userAuthentication, transactionController.addTransaction);
transactionRoutes.get("/viewall", userAuthentication, transactionController.getTransactions);
transactionRoutes.put("/update", userAuthentication, transactionController.updateTransaction);
transactionRoutes.delete("/delete", userAuthentication, transactionController.deleteTransaction);
transactionRoutes.get("/convertor", userAuthentication, transactionController.convertCurrency);

module.exports = transactionRoutes;
