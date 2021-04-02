const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router
    .route('/sign-up')
    .post(usersController.createNewUser);

router
    .route('get-jwt')
    .post()
    
router
    .route('/signin')
    .post(usersController.validateLogin);

router
    .route('/todaystasksandevents')
    .get(usersController.getUserEventsAndTasks);

module.exports = router;