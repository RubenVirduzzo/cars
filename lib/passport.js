const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const helpers = require('./helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const user = await User.findOne({email: email})

    const compare = await helpers.compare(password, user.password)
    if (compare) {
        done(null, user)
    } else {
        done(null, false)
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const { fullname, username } = req.body;
    const user = await new User({
        fullname: fullname,
        username: username,
        email: email,
        password: password
    })
    user.password = await helpers.encryptPassword(password)
    user.id = user.insertId
    user.save()
    done(null, user)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
})