const express = require("express");
const router = express.Router();

const addTask = require("../controllers/addTask");
const deleteTask = require("../controllers/deleteTask");
const listTasks = require("../controllers/listTasks");
const markTaskComplete = require("../controllers/markTaskComplete");

router.route("/addTask").post(addTask);
router.route("/deleteTask").delete(deleteTask);
router.route("/listTasks").get(listTasks);
router.route("/markTaskComplete").patch(markTaskComplete);

module.exports = router;
