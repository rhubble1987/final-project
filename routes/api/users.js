const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router
    .post(usersController.createNewUser);

module.exports = router;