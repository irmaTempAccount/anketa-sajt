const mongoose = require('mongoose');


const RezultatSchema = new mongoose.Schema({
  anketa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anketa'
  },
  rezultati: {
    type: Object,
    required: true
  }
});

const Rezultat = mongoose.model('Rezultat', RezultatSchema);

module.exports = Rezultat;
