var express = require('express');
const Anketa = require('../models/ankete');
const Rezultat = require('../models/rezultati-ankete');
var router = express.Router();

router.get('/', async function (req, res, next) {
  var ankete = await Anketa.find({});
  res.render('ankete', { ankete });
});

router.get('/:id', async function (req, res, next) {
  var anketa = await Anketa.findById(req.params.id);

  if (!anketa) {
    return res.redirect('/');
  }

  res.render('anketa', { anketa });
});

router.post('/', async function (req, res, next) {
  if (!req.body.ime || req.body.pitanja.length === 0) {
    return res.sendStatus(400);
  }

  var novaAnketa = await Anketa.create({
    ime: req.body.ime,
    pitanja: req.body.pitanja
  });

  res.json(novaAnketa);
});

router.post('/:id', async function (req, res, next) {
  var anketa = await Anketa.findById(req.params.id);

  await Rezultat.create({ anketa: anketa._id, rezultati: req.body });
  res.redirect(anketa._id + '/rezultati')
});

router.get('/:id/rezultati', async function (req, res, next) {
  var anketa = await Anketa.findById(req.params.id);

  var rezultati = await Rezultat.find({ anketa: anketa._id });

  var rez = rezultati.map((rezultat) => rezultat.rezultati);

  var brojalica = {};

  for (let i = 0; i < rez.length; i++) {
    const rezultat = rez[i];

    for (const prop in rezultat) {
      if (rezultat.hasOwnProperty(prop)) {
        const odgovor = rezultat[prop];

        if (!brojalica.hasOwnProperty(prop)) {
          brojalica[prop] = {};
        }

        if (!brojalica[prop].hasOwnProperty(odgovor)) {
          brojalica[prop][odgovor] = 0;
        }

        brojalica[prop][odgovor]++;
      }
    }
  }

  res.render('rezultati', {anketa, brojalica})
});

module.exports = router;
