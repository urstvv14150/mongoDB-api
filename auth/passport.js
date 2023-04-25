const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(new GoogleStrategy({
    clientID: '674252792349-jpl78fpvl2qdbb45i1fukdr0pidrhs5p.apps.googleusercontent.com',
    clientSecret: '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',
    // callbackURL: "https://mongo-db-api-delta.vercel.app/auth/google/callback"
    callbackURL: "http://localhost:5050/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    Users.findOne({googleId: profile.id}, async function (err, user) {
      if(user) {
        const updatedUser = {
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          picUrl: profile.photos[0].value,
          sercet: accessToken
        }
        await Users.findOneAndUpdate(
          { _id: user.id },
          { $set: updatedUser }          
        ).then((result) => {
          return done(err, result)
        })        
      }else {
        const newUser = new Users({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          picUrl: profile.photos[0].value,
          sercet: accessToken
        })
        newUser.save().then((result) => {
          return done(err, result)
        })
      }
    })    
  }
));

passport.use(new GithubStrategy({
    clientID: '970a6df1b4b8be2e9bcc',
    clientSecret: 'ecb5ad5efd0901d065eb52788e3250b627545dbc',
    // callbackURL: "https://mongo-db-api-delta.vercel.app/auth/github/callback"
    callbackURL: "http://localhost:5050/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {    
    // console.log(profile);
    Users.findOne({githubId: profile.id}, async function (err, user) {
      console.log(user);
      if(user) {
        const updatedUser = {
          githubId: profile.id,
          username: profile.username,          
          picUrl: profile.photos[0].value,
          sercet: accessToken
        }
        await Users.findOneAndUpdate(
          { _id: user.id },
          { $set: updatedUser }          
        ).then((result) => {
          return done(err, result)
        })        
      }else {
        const newUser = new Users({
          githubId: profile.id,
          username: profile.username,          
          picUrl: profile.photos[0].value,
          sercet: accessToken
        })
        newUser.save().then((result) => {
          return done(err, result)
        })
      }
    })    
  }
));

passport.use(new FacebookStrategy({
  clientID: '2517923115032307',
  clientSecret: 'daba8d060dad031784648661c9dde48c',
  // callbackURL: "https://mongo-db-api-delta.vercel.app/auth/facebook/callback"
  callbackURL: "http://localhost:5050/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {  
  // console.log(profile)  
  Users.findOne({facebookId: profile.id}, async function (err, user) {
    if(user) {
      const updatedUser = {
        facebookId: profile.id,
        username: profile.displayName,      
        sercet: accessToken
      }
      await Users.findOneAndUpdate(
        { _id: user.id },
        { $set: updatedUser }          
      ).then((result) => {
        return done(err, result)
      })        
    }else {
      const newUser = new Users({
        facebookId: profile.id,
        username: profile.displayName,      
        sercet: accessToken
      })
      newUser.save().then((result) => {
        return done(err, result)
      })
    }
  })    
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