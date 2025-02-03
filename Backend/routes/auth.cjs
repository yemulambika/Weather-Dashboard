const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const router = express.Router();
require("../server/db/conn.cjs");
const User = require("../model/userSchema.cjs");

// Use cookie-parser middleware
router.use(cookieParser());

// Root route
router.get("/", (req, res) => {
    res.send("Hello From server router.js");
});

// About route without authentication
router.get("/about", (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to the About page" });
    } catch (err) {
        console.error("Error in /about route:", err);
        res.status(500).json({ error: "Server error in About page" });
    }
});


router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        const user = new User({ name, email, phone, work, password });

        await user.save(); // Save user to MongoDB Atlas
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error in registration:", err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all the data" });
        }

        const userLogin = await User.findOne({ email });

        if (!userLogin) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY);
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000), // 30 days
            httpOnly: true,
        });

        console.log("User signed in successfully:", userLogin.email);
        return res.status(200).json({ message: "User signed in successfully", token });
    } catch (err) {
        console.error("Error during signin:", err);
        return res.status(500).json({ error: "Server error" });
    }
});

// Export the router
module.exports = router;
