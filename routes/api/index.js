const router = require("express").Router();
const bookRoutes = require("./books");
const eventRoutes = require("./event");
const wmUserRoutes = require("./wmUser");

//Routes
router.use("/books", bookRoutes);
router.use("/event", eventRoutes);
router.use("/wmUser", wmUserRoutes);


module.exports = router;
