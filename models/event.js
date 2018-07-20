const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventCreator: {type: String, required: true},
  eventID: {type: String, unique: true, required: true},
  eventName: { type: String, required: true },
  eventLocation: { type: String, required: true },
  guestNumber: { type: Number, max: 10000},
  eventDescript: { type: String, required: true },
  date: { type: String, required: true},
  dress: { type: String, required: true},
  //usersInRoom: {type: String}
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
