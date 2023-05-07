const mongoose= require("mongoose");

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String ,
        unique: true,

    },
    password:{
        required: true,
        type: String,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now, 
    }
});

User = mongoose.model("User", schema);

module.exports = User;