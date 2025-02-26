const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    profilePicture:{
        type: String,
        default: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1740565162~exp=1740568762~hmac=15f5ba27d4bb8e65002b394a1805372a7b817436c37237da7d6e1e8bbdd557c5&w=740",
    }
},{timestamp: true}
)
const User = mongoose.model('User', userSchema);
module.exports = User;