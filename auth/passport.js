const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const { Users } = require('../models/model')

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret_key
  }, 
  function(jwt_payload, done) {    
    Users.findOne({email: jwt_payload.payload.email}, function(err, user) {             
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '674252792349-jpl78fpvl2qdbb45i1fukdr0pidrhs5p.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

// serializeUser()：可設定要將哪些 user 資訊，儲存在 Session 中的 passport.user。（如 user._id）
// deserializeUser()：可藉由從 Session 中獲得的資訊去撈該 user 的資料

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});