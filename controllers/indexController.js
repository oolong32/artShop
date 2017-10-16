const async = require('async');

exports.index = function(req, res) {
  res.render('index.html', { title: 'Express for real' });
}
