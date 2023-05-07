const mongoose  = require("mongoose");

const connectDB =  mongoose.connect(process.env.MONGO_URI, {
    dbName: "backendapi",
})
.then(() => console.log("Database Conneted"))
.catch((e) => console.log(e));


module.exports = connectDB;