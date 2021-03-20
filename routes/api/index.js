const router = require("express").Router();
const usersRoutes = require('./users');
const tasksRoutes = require('./tasks');

// Post routes
router.route("/users", usersRoutes);
router.use("/tasks", tasksRoutes)

module.exports = router;
