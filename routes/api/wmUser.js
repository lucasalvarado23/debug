const router = require("express").Router();
const wmUserController = require("../../controllers/wmUserController");

router
  .route("/")
  .post(wmUserController.create);

router
  .route("/getAttending/:eventCode")
  .get(wmUserController.findAttendees);

router
  .route("/getAttendee/:userID")
  .get(wmUserController.getAttendee);

router
  .route("/:email")
  .get(wmUserController.findOne);

router
  .route("/:userUpdate")
  .put(wmUserController.findOneAndUpdate);



 // .delete(wmUserController.remove);



module.exports = router;