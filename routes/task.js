const { newTask, getmyTask, UpdateTask, deleteTask,} = require("../controllers/task");

const isAuthenticaticated = require("../middleware/auth");

const router = require('express').Router();


router.post("/new",isAuthenticaticated, newTask)

router.get("/my",isAuthenticaticated, getmyTask)


router.put("/:id",isAuthenticaticated, UpdateTask );

router.delete("/:id",isAuthenticaticated,deleteTask)
module.exports = router;