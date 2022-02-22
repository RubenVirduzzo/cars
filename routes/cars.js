var express = require('express');
var router = express.Router();
const Cars = require('../models/cars')
const { isLoggedIn } = require('../lib/protect')

/* GET users listing. */
router.get('/', isLoggedIn, async(req, res, next) => {
  const cars = await Cars.find({user_id: req.user})
  res.render('cars/list', {cars});
});

router.get('/api', isLoggedIn, async(req, res, next) => {
  const cars = await Cars.find({user_id: req.user})
  res.json({cars});
});

router.get('/add', isLoggedIn, async(req, res, next) => {
  res.render('cars/add');
});

router.post('/add', isLoggedIn, async(req, res, next) => {
  const { marca, potencia, url } = req.body
  const car = await new Cars({
    marca: marca,
    potencia: potencia,
    url: url,
    user_id: req.user
  })
  await car.save();
  res.redirect('/cars');
});

router.get('/edit/:id', isLoggedIn, async(req, res, next) => {
  const car = await Cars.findById(req.params.id)
  res.render('cars/edit', {car});
});

router.post('/edit/:id', isLoggedIn, async(req, res, next) => {
  await Cars.findByIdAndUpdate(req.params.id, req.body, {})
  res.redirect('/cars');
});

router.get('/delete/:id', isLoggedIn, async(req, res, next) => {
  await Cars.findByIdAndDelete(req.params.id)
  res.redirect('/cars');
});

module.exports = router;
