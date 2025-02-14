const express=require("express");
const userRoutes = require("./userRouter");
// const incomeRoutes = require("./incomeRouter");
// const expenseRoutes = require("./expenseRouter");
const userController = require("../controllers/userController");
const passport = require("passport");
const budgetRoutes = require("./budgetRouter");
const savingsRoutes = require("./savingsRouter");
const notificationRouter = require("./notificationRouter");
const transactionRoutes = require("./transactionRoutes");
const router=express()

router.use("/users", userRoutes);
// router.use("/income", incomeRoutes);
// router.use("/expense", expenseRoutes);
router.use("/transaction", transactionRoutes);
router.use("/budget", budgetRoutes);
router.use("/savings", savingsRoutes);
router.use("/notification", notificationRouter);
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/" }),userController.googleRegister);
 

module.exports=router