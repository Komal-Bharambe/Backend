const User = require("../models/user")
// const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const sendCookie = require("../utils/feature");
 // file distributed in all other files is called MVC

const getAllUser =  async(req,res)=>{

}

const login = async(req,res) =>{
   try {
    const{email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({
            success: false,
            message: "Invalid email and password"
        });
    }
        const isMatch = user.password === password;

        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: "Invalid email and password",
            })
         }

         sendCookie(user,res,`Welcome back, ${user.name}`, 200);
   } catch (error) {
    console.log(error)
   }
    
}

const register = async(req,res)=>{ 
  try {
    const {name, email,password} = req.body;

    let user = await User.findOne({email});
 
    if(user){
     return res.status(404).json({
         success: false,
         message: "User alredy exists"
     });
 }
 
     // const hashpassword = await bcrypt.hash(password, 10);
 
     // user = await User.create({name, email, password:hashpassword});
     user = await User.create({name, email, password});
    
     // jwt is stored on utils/feature.js  karu sakta
    
     
     sendCookie(user,res,"Registerd successfully", 200); // or else write hear also without passing
    
  } catch (error) {
    console.log(error)
  }
}


const getmyprofile = async(req,res) =>{ 
    
    try {
            // first check isAuthenticated
    // by using cookie-parser cha use karun user kadu

    res.status(200).json({
        success: true,
        user: req.user, // req.user is in isAuthenticate route
    })
    } catch (error) {
        console.log(error)
    }
}

const logout = async(req,res) =>{
    res.status(200).cookie("token", null,{
        expires: new Date(Date.now()),
         // Before deploying do this
         sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",

         secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        user: req.user 
    })
}

module.exports = {
    getAllUser,
    register,
    login,
    getmyprofile,
    logout
    
}