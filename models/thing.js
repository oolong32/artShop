var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  content: { type: String, required: true },
  },
  { timestamps: true },
  { collection: 'things' });


// Virtual for thing’s URL
ThingSchema
.virtual('url')
.get(function () {
  return '/thing/' + this._id;
});

// Virtual for thing’s date
ThingSchema
.virtual('date_formatted')
.get(function () {
  return moment(this.createdAt).locale('de-ch').format('lll');
});

// Virtual for thing’s update date
ThingSchema
.virtual('updated_formatted')
.get(function () {
  return moment(this.updatedAt).locale('de-ch').format('lll');
});

// Virtual for thing’s date UNFORMATTED
ThingSchema
.virtual('date_unformatted')
.get(function () {
  return moment(this.createdAt).locale('de-ch').format();
});

// Virtual for thing’s expiration date UNFORMATTED
ThingSchema
.virtual('updated_unformatted')
.get(function () {
  return moment(this.createdAt).add(2, 'days').locale('de-ch').format();
});

// Export model
module.exports = mongoose.model('Thing', ThingSchema);
