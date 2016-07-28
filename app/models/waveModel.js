var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaveSchema = new Schema({ 
  id: { type: String },
  pokemonId: { type: Number },
  coords: { type: Object },
  position: { type: Array },
  icon: { type: String },
  createdAt: { type: Date, required: true, default: Date.now, expires: 300 }
});

module.exports = mongoose.model('Wave', WaveSchema);