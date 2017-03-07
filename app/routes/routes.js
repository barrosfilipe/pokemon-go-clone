var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Pusher = require('pusher');

/* Pusher App Config */
var pusher = new Pusher({
  appId: '229494',
  key: 'ccedb8e6498c65d87b88',
  secret: '2fafea90795450dd3e02',
  encrypted: true
});

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
     } else {
      pusher.trigger('map', 'despawn', {});
    };
  });
});

module.exports = router;