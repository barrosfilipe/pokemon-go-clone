var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaveSchema = new Schema({ 
  id: { type: String },
  pokemonId: { type: Number },
  pokemonName: { type: String },
  coords: { type: Object },
  position: { type: Array },
  icon: { type: String },
  createdAt: { type: Date, required: true, default: Date.now, expires: 120 }
});

module.exports = mongoose.model('Wave', WaveSchema);