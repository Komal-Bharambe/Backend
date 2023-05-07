const mongoose= require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    description: {
        type: String ,
        required: true,

    },
    isCompleted:{
        type: Boolean,
        default: false, // uncheacked ahe manun value false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // collection name data ref madhe
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now, 
    }
});

Task = mongoose.model("Task", schema);

module.exports = Task;