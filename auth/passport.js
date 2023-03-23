const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../models/model')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromExtractors([
  (req) => {
    return req.cookies["_auth"]
  }
]);
opts.secretOrKey = process.env.secret_key;

passport.use(new JwtStrategy(opts, 
  function(jwt_payload, done) {
    User.findOne({id: jwt_payload._id}, function(err, user) {
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