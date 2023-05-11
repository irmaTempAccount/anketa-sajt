const mongoose = require('mongoose');

const PitanjeSchema = new mongoose.Schema({
  pitanje: {
    type: String,
    required: true
  },
  opcije: [
    {
      type: String,
      required: true
    }
  ]
});

const AnketaSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
  pitanja: [
    {
      type: PitanjeSchema
    }
  ]
});

const Anketa = mongoose.model('Anketa', AnketaSchema);

module.exports = Anketa;
