const express = require("express");
const router = express.router();
const taskController = require("../controllers/taskController");

router.post("/createTask", taskController.createTask);
router.post("/updateTask", taskController.updateTask);
router.post("/deleteTask", taskController.deleteTask);

module.exports = router;
