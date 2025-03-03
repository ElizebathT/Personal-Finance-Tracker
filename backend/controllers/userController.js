const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const userController = {
    register: asyncHandler(async (req, res) => {
        const { username, email, password, role, dob } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            verified: false,
            role,
            dob,
            verificationToken
        });

        if (!user) {
            return res.status(500).json({ message: "User creation failed" });
        }

        const payload = { email: user.email, id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });

        res.cookie("token", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production"
        });

        const verificationLink = `${process.env.CLIENT_URL}/verify?token=${verificationToken}`;
        // await transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: "Verify Your Email",
        //     html: `<p>Click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`
        // });

        res.json({ token });
    }),

    verifyEmail: asyncHandler(async (req, res) => {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "Invalid or missing token" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findOne({ email: decoded.email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.verified) {
                return res.status(200).json({ message: "Email already verified" });
            }

            user.verified = true;
            user.verificationToken = null;
            await user.save();

            res.status(200).json({ message: "Email verification successful" });
        } catch (error) {
            res.status(400).json({ message: "Invalid or expired token" });
        }
    }),

    googleRegister: asyncHandler(async (req, res) => {
        const email = req.user.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                username: email,
                verified: true
            });

            if (!user) {
                return res.status(500).json({ message: "User creation failed" });
            }
        }

        const payload = { email: user.email, id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });

        res.cookie("token", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ message: "User authenticated successfully" });
    }),

    login: asyncHandler(async (req, res) => {       
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.verified) {
            return res.status(401).json({ message: "Please verify your email before logging in" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const payload = { email: user.email, id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });
        res.json({ token });

    }),

    getUserProfile: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User details retrieved successfully", user });
    }),

    logout: asyncHandler(async (req, res) => {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out" });
    }),

    profile: asyncHandler(async (req, res) => {
        const { username, password, oldPassword, dob } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (password) {
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Incorrect old password" });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        if (username) user.username = username;
        if (dob) user.dob = dob;
        await user.save();

        res.status(200).json({ message: "Profile updated successfully" });
    })
};

module.exports = userController;
