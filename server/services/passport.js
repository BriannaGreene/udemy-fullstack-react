const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user))
        }
      })
    }
  )
)

// passport.use(new TwitterStrategy({
//     consumerKey: keys.twitterConsumerKey,
//     consumerSecret: keys.twitterConsumerSecret,
//     callbackURL: "/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, cb) {
//     console.log('token from twitter:', token);
//     // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//   }
// ));
