const { ErrorHandler } = require("../middleware/error");
const Task = require("../models/task")

 const newTask = async(req,res) =>{
   try {
    const {title, description} = req.body;

    console.log("working 1");

    await Task.create({
        title,
        description,
        user: req.user, // auth madhe ahe
    })

    res.status(201).json({
        success: true,
        message: "Tak added Successfully",
    })
   } catch (error) {
        console.log(error)
   }
}

const getmyTask =  async(req,res) =>{
    try {
        const userid = req.user._id;

    const tasks = await Task.find({user: userid}); // model madhe user ahe manun he kel user: userid

    res.status(200).json({
        success: true,
        tasks: tasks
    })
    } catch (error) {
        console.log(error)
    }
}


const UpdateTask =  async(req,res) =>{
   try {
     // const {id} = req.params;

     try {
        const task = await Task.findById(req.params.id);

    task.isCompleted = !task.isCompleted;

    if(!task){
        return res.status(404).json({
            success: false,
            message: "Invalid Id",
        })
    } 
//or
    // if(!task) return next(new Error("Invalid id"));
    await task.save();
    
    res.status(200).json({
        success: true,
        message: "Task Updated"
    })
    } catch (error) {
        console.log(error)
    }
   } catch (error) {
    consolelog(error)
   }
}


const deleteTask =  async(req,res,next) =>{
   
    try {
        const {id} = req.params;

    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({
            success: false,
            message: "Invalid Id",
        })
    } 
    //or
    // if(!task) return next(new ErrorHandler("Invalid id")); //app madhe use kel ahe app.use and error.js sepsrate file madhe

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "message deleted"
    })
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    newTask,
    getmyTask,
    UpdateTask,
    deleteTask
}
    
