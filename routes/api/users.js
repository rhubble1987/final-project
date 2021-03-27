const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router
    .route('/')
    .post(usersController.createNewUser);
    
router
    .route('/signin')
    .post(usersController.validateLogin);

module.exports = router;