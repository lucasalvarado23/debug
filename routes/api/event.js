const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

// Matches with "/api/books"
router
  .route("/")
  .post(eventsController.create);

// Matches with "/api/books/:id"
router
  .route("/actualEvent/:eventCode")
  .get(eventsController.actualEvent);

router
  .route("/myEvents/:userID")
  .get(eventsController.myEvents);

router
  .route("/:id")
  .get(eventsController.findOne)
  .delete(eventsController.remove);

 // .put(booksController.update)
 // .delete(booksController.remove);

module.exports = router;
