const express = require("express");
const  mongoose = require("mongoose");
const dotenv = require("dotenv") // when deployed then changes only on dotenv
dotenv.config('./.env'); // config is required

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");


const {connectDB} = require("./dbconnect/database");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors")


const app = express();



// Router get and post router madhe pan karu sakta
// vegedya file madhe karnasathi route use karte

// yane json cha data save karu  sakta without using from = from madhe urlencoded use karav lagat middleware data asscess la
app.use(express.json());  // usesd before routes
app.use(cookieParser())
app.use(cors({ // request allow karel our website cha
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));
// router use karnasathi app ne


// using routes this is important

app.use("/api/v1/users", userRouter) // /users already request madhe [v1 for 1st version is used]
app.use("/api/v1/task", taskRouter);


app.get("/" ,(req,res) =>{
    res.send("Nice");
})

// ata post request kachi karnar access testing la manun postman cha use karu manun postman use karu request test karayla


// userid/bsfhbd
// userid/dbgvjehqi


// special varti ahe so te execute hoil adi but dynamic data asel teva : id hech yeil 


// use error middleware
app.use(errorMiddleware)


const PORT = process.env.PORT || 4000;
connectDB;

app.listen(PORT,() =>{
    console.log(`server started port on ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
})