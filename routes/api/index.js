const router = require("express").Router();
const usersRoutes = require('./users');
const tasksRoutes = require('./tasks');
const eventBlocksRoutes = require('./eventBlocks');

// Post routes
router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);
router.use("/events", eventBlocksRoutes);

module.exports = router;