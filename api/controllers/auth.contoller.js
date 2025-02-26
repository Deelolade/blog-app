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
    const { username,email, password } = req.body;
    if (!username || !email || !password || email === "" || password === "" || username === "") {
        next(errorHandler(400, "All Fields are required"))
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            next(errorHandler(404, "User not found"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorHandler(400, "invalid password"))
        }
        const token = jwt.sign(
            {id: validUser._id,}, process.env.JWT_SECRET);
            const {password: pass, ...rest}= validUser._doc
            res.status(200).cookie("access_token", token,{
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error)
    }
}
// POST /api/auth/google
const google = async(req, res, next)=>{
    const {email, name, photo}=  req.body;

    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password, ...rest }= user._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json(rest)
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,  10)

            const newUser = new User({
                username:name.toLowerCase().replace(/\s+/g, "") + Math.random().toString(36).slice(-4),
                email,
                password:hashedPassword,
                profilePicture: photo,
            });
            await newUser.save();
            const token =  jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest}= newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest)
        }
    } catch (error) {
        next(error)
        
    }
}

module.exports = {signup, signin, google};