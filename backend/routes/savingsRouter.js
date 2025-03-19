const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const savingsController = require("../controllers/savingsController");
const twilioClient = require("../middlewares/twilio");
const savingsRoutes = express.Router();

savingsRoutes.post('/add', userAuthentication, savingsController.setSavingsGoal);
savingsRoutes.get('/get', userAuthentication, savingsController.getSavingsGoals);
savingsRoutes.put('/edit', userAuthentication, twilioClient,savingsController.updateSavingsGoal);
savingsRoutes.delete('/delete/:id', userAuthentication, savingsController.deleteSavingsGoal);

module.exports = savingsRoutes;
