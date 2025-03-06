const express = require("express");
const adminAuthentication = require("../middlewares/admin");
const adminController = require("../controllers/adminController");
const adminRoutes = express.Router();

adminRoutes.put("/verify", adminAuthentication,adminController.verifyUser);
adminRoutes.get("/dashboard", adminAuthentication,adminController.getDashboardData);

module.exports = adminRoutes;
