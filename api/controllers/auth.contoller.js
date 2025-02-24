const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

// POST /api/auth/signup
const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    // check if user exists
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));
    };
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Hashed Password:", hashedPassword);
    // create new user document
    const newUser = new User({
        username, email, password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json({ message: "sign up successfully" })
    } catch (error) {
        next(errorHandler(500, error));
    }
}
// POST /api/auth/signin
const signin = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // ❗ Ensure all fields are filled
        if (!username || !email || !password) {
            return next(errorHandler(400, "All Fields are required"));
        }

        // ❗ Check if user exists
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        // ❗ Check if password is correct
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // Optional: Set expiration
        );

        // ✅ Send response with token (only once)
        const { password: pass, ...rest } = validUser._doc;
        return res
            .status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json(rest);

    } catch (error) {
        return next(error); // ✅ Ensure error is properly passed to error handler
    }
};

module.exports = {signup, signin};