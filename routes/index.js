var express = require('express');
var router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/protect')


/* GET home page. */
router.get('/', async(req, res, next) => {
  res.render('index');
});

router.get('/signin', isNotLoggedIn, async(req, res, next) => {
  res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, async(req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/cars',
    failureRedirect: '/signin'
  })(req, res, next);
});

router.get('/signup', isNotLoggedIn, async(req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/cars',
  failureRedirect: '/signup'
}));

router.get('/logout', isLoggedIn, async(req, res, next) => {
  req.logOut()
  res.redirect('/signin');
});

module.exports = router;
