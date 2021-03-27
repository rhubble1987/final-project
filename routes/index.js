const path = require("path");
const usersController = require("../controllers/usersController");
const router = require("express").Router();
const apiRoutes = require("./api");

//router.use("/api", apiRoutes);
router.get('/test', (req, res) => res.send('testing'));

router.route('/api/users')
    .post(usersController.createNewUser);

router.route('/api/signin').post(usersController.validateLogin);
// router.use(function(req,res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;