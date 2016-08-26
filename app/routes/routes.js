var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

/* Initialize Model */
const Wave = mongoose.model('Wave');

/* Get Wave Route */
router.get('/wave', function (req, res) {
	Wave.find({}, function (err, wave) {
		res.json(wave);
	});
});

/* Post Wave Route (Delete Caught Pokémons) */
router.post('/wave', function (req, res) {
	Wave.remove({_id: ObjectId(req.body._id)},
	function (err) {
		if (err) {
			console.log(err)
		};
	});
});

module.exports = router;