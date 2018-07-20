const db = require("../models");

// Defining methods for the booksController
module.exports = {
  /*
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, */
  create: function(req, res) {
    console.log(req.body);
    db.Event
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err.message)); //res.status(422).json(err));
  },

  myEvents: function(req, res){
      db.Event
      .find({'eventCreator': req.params.userID})
      .then(dbModel => res.json(dbModel))
      .then(console.log(res.error))
      .catch(err => console.log(err.response));
  },

  actualEvent: function(req, res){
    console.log("in here" + req.params.eventCode);
    db.Event
      .findOne({eventID: req.params.eventCode})
      .then(dbModel => res.json(dbModel))
     // .then(console.log(res.json(dbModel)))
      .catch(err => res.status(422).json(err));
  },

  findOne: function(req,res){
    db.Event
      .findOne({eventID: req.params.id})
      .then(dbModel => res.json(dbModel))
     // .then(console.log(res.json(dbModel)))
      .catch(err => res.status(422).json(err));
  }, 

  remove: function(req, res) {
    db.Event
    .findOne({eventID: req.params.id})
    .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
/*
  findById: function(req, res) {
    db.Event
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, 
*/


  /*,
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } */

