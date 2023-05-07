const { getAllUser, register, login, getmyprofile, logout} = require("../controllers/user");
const isAuthenticaticated = require("../middleware/auth");
const User = require("../models/user")

const router = require('express').Router();

router.get("/all", getAllUser)

router.post("/new", register);

router.post("/login", login)


router.post("/logout", logout);

router.get("/me",isAuthenticaticated, getmyprofile)

module.exports = router;