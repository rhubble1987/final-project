const router = require("express").Router();
const eventBlocksController = require("../../controllers/eventBlocksController");

router
  .route("/:userId")
  .get(eventBlocksController.getUserEventBlocks)
  

router
  .route("/")
  .post(eventBlocksController.create);

module.exports = router;