const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");

router
    .route("/")
    .get(tasksController.getUserTasks)
    .post(tasksController.create);

module.exports = router;