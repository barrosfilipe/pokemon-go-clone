var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* Initialize Model */
const Wave = mongoose.model('Wave');

/* Get Wave Route */
router.get('/wave', function (req, res) {
  Wave.find({}, function (err, wave) {
    res.json(wave);
  });
});

module.exports = router;