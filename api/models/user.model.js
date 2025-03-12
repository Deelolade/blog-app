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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-placeholder&psig=AOvVaw1FeVSM0C0IJmjLXQIUqOZw&ust=1741683990757000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDBy-KU_4sDFQAAAAAdAAAAABAT"
        // default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1QwYCYR8P8FJCAB6vdCsHP8FC34rlcHheR5MXkYIEbh1bNZP1I6j8ldZKI0rJqksQ2nI&usqp=CAU "
    }
},{timestamp: true}
)
const User = mongoose.model('User', userSchema);
module.exports = User;