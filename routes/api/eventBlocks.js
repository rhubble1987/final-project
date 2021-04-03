const router = require("express").Router();
const eventBlocksController = require("../../controllers/eventBlocksController");

router
  .route("/")
  .get(eventBlocksController.getUserEventBlocks)
  .post(eventBlocksController.create);

module.exports = router;