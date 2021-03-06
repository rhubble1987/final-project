const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");
router

    .route("/:userId")
    .delete(tasksController.deleteUserTask);

router
    .route("/:userId")
    .get(tasksController.getUserTasksForToday);


router
    .route("/")
    .post(tasksController.create)
    .put(tasksController.updateUserTask);

router 
    .route("/complete")
    .put(tasksController.completeUserTask);

router 
    .route('/alltasks/:userId')
    .get(tasksController.getAllTasksForAUser);

module.exports = router;