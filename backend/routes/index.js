const express=require("express");
const userRoutes = require("./userRouter");
const incomeRoutes = require("./incomeRouter");
const expenseRoutes = require("./expenseRouter");
const userController = require("../controllers/userController");
const passport = require("passport");
const budgetRoutes = require("./budgetRouter");
const router=express()

router.use("/users", userRoutes);
router.use("/income", incomeRoutes);
router.use("/expense", expenseRoutes);
router.use("/budget", budgetRoutes);
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/" }),userController.googleRegister);
 

module.exports=router