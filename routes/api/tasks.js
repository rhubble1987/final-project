const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");
router
    .route("/")
    .get(tasksController.getUserTasks)
    .post(tasksController.create)
    .put(tasksController.updateUserTask)
    .delete(tasksController.deleteUserTask);

module.exports = router;