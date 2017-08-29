const app = require('APP'), {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const {User, OAuth} = require('APP/db')
const auth = require('express').Router()
const config = require('../config.js')

// Google needs the GOOGLE_CLIENT_SECRET AND GOOGLE_CLIENT_ID
// environment variables.
OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config,
  passport
})

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        if (!user) debug('deserialize retrieved null user for id=%d', id)
        else debug('deserialize did ok user.id=%d', id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

passport.use(new (require('passport-local').Strategy)(
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({
      where: {email},
      attributes: {include: ['password_digest']}
    })
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', email, user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

auth.get('/whoami', (req, res) => res.send(req.user))

// POST requests for local login:
auth.post('/login/local', passport.authenticate('local', {successRedirect: '/'}))

// GET requests for OAuth login:
// Register this route as a callback URL with OAuth provider
auth.get('/login/:strategy', (req, res, next) => {
  return passport.authenticate(req.params.strategy, {
    scope: 'email', 
    successRedirect: '/',
  })(req, res, next)
})

auth.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
