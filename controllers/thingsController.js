const mongoose = require('mongoose');
// const async = require('async');

// model
const Thing = require('../models/thing.js');

/* display all things */
exports.things = function(req, res) {
  mongoose.model("Thing").find(function(err, results) {
    res.render('things.html', { title: 'All the things', things: results });
  });
};

/* display one single thing */
exports.thing = function(req, res) {
  let id = req.params.thing;
  console.log(`gesucht: ${id}`);
  mongoose.model("Thing").find({ "_id": id }).exec(
    function (err, result) {
      if (err) { `Ding mit ID ${id} konnte nicht gefunden werden.` }
      res.render('single_thing.html', { title: 'One Thing', thing: result[0] });
    }
  );
};

/* get form to create thing */
exports.thingCreateGet = function(req, res) {
    res.render('thing_create.html', { title: 'New Thing.' });
}

/* post form to create thing */
exports.thingCreatePost = function(req, res, next) {
  // validate, sanitize & trim
  req.checkBody('content', 'Content not alphanumeric').isAlpha();
  req.sanitize('content').escape(); // redundant, weil html nicht alphanumerisch
  req.sanitize('content').trim();

  var thing = new Thing({ content: req.body.content });

  var errors = req.validationErrors();
  if (errors) {
        // If there are errors render the form again, passing the previously entered values and errors
    res.render('thing_create.html', { title: 'New Thing', thing: thing, errors: errors});
    return;
  } else {
    // existiert das schon?
    Thing.findOne({ 'content': req.body.content })
    .exec(function (err, foundThing) {
      if (err) { return next(err); }
      if (foundThing) {
        console.log(`Ein Ding mit Inhalt «${foundThing.content}» existiert bereits. Es hat die ID ${foundThing._id}`);
        res.redirect(foundThing.url);
        return;
      } else { // speichern
        thing.save(function (err) {
          if (err) { return next(err); }
          res.redirect(thing.url);
          return;
        });
      }
    });
  }
}
