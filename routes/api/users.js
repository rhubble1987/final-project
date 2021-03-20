const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router
    .post(usersController.createNewUser)
    .get((req, res) => {
        res.send('Hello')
    });

module.exports = router;