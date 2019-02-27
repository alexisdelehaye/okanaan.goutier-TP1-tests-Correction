var express = require('express');
var router = express.Router();
var Film = require('../models/film');

router.get('/', function(req, res, next) {
  res.send('Hello, World!');
});

// *** api routes *** //
router.get('/films', findAllFilms);
router.get('/film/:id', findFilmById);
router.post('/films', addFilm);
router.put('/film/:id', updateFilm);
router.delete('/film/:id', deleteFilm);

// *** get ALL films *** //
function findAllFilms(req, res) {
  Film.find(function(err, films) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(films);
    }
  });
}

// *** get SINGLE films *** //
function findFilmById(req, res) {
  Film.findById(req.params.id, function(err, film) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(film);
    }
  });
}

// *** post ALL films *** //
function addFilm(req, res) {
  var newFilm = new Film({
    title: req.body.title,
    year: req.body.year
  });
  newFilm.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newFilm});
    }
  });
}

// *** put SINGLE film *** //
function updateFilm(req, res) {
  Film.findById(req.params.id, function(err, film) {
    film.title = req.body.title;
    film.year = req.body.year;
    film.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': film});
      }
    });
  });
}

// *** delete SINGLE film *** //
function deleteFilm(req, res) {
  Film.findById(req.params.id, function(err, film) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      film.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': film});
        }
      });
    }
  });
}

module.exports = router;
