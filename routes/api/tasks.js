const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");
router

    .route("/:userId")
    .get(tasksController.getUserTasksForToday)
    .post(tasksController.create)
    .put(tasksController.updateUserTask)
    .delete(tasksController.deleteUserTask);

router 
    .route('/alltasks/:userId')
    .get(tasksController.getAllTasksForAUser);

module.exports = router;