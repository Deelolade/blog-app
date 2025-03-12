const express = require('express');
const port = 5000;
const app = express();
const connectDB = require('./db');
const userRouter = require('./routes/user.route.js');
const authRouter = require('./routes/auth.route.js');
const cors = require('cors');
const cookieparser = require("cookie-parser");
app.use(express.json())
app.use(cors());
app.use(cookieparser());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

app.get('/', (req, res)=>{
    res.json('api is running')
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

// Connect to MongoDB
connectDB();