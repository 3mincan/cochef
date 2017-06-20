const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const port = process.env.PORT || 8080;
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const db = require('./database.js');

const multer = require('multer');
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

app.use(cookieSession({
    name: 'session',
    secret: 'secret',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended : false }));

passport.serializeUser((user, done)=>{
    log.debug("serialize ", user);
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done)=>{
    log.debug("deserialize ", id);
    db.one("SELECT user_id, firstname, lastname, email FROM users " +
            "WHERE user_id = $1", [id])
    .then((user)=>{
      //log.debug("deserializeUser ", user);
      done(null, user);
    })
    .catch((err)=>{
      done(new Error(`User with the id ${id} does not exist`));
    })
  });

passport.use(new LocalStrategy({
    email: 'email',
    password: 'password'
    },
    (username, password, done) => {
        log.debug("Login process:", username);
        return db.one("SELECT user_id, firstname, lastname, email, hashedPass" +
                      "FROM users " +
                      "WHERE email=$1 AND user_pass=$2", [username, password])
  .then((result)=> {
    return done(null, result);
  })
  .catch((err) => {
    log.error("/login: " + err);
    return done(null, false, {message:'Wrong user name or password'});
  });
}));

passport.use(new GoogleStrategy({
    consumerKey: config.google.clientID,
    consumerSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

passport.use('facebook', new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
},

  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({ 'id' : profile.id }, function(err, user) {

        if (err)
          return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.fb.id    = profile.id; // set the users facebook id
            newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user
            newUser.fb.firstName  = profile.name.firstname;
            newUser.fb.lastName = profile.name.lastname; // look at the passport user profile to see how names are returned
            newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
         }
      });
    });
}));

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    FbUsers.findOne({fbId : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{
            var newUser = new FbUsers({
                fbId : profile.id ,
                email : profile.emails[0].value,
                name : profile.displayName
            }).save(function(err,newUser){
                if(err) throw err;
                done(null, newUser);
            });
        }
    });
  }
));

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/', passport.authenticate('local'), (req, resp)=>{
  log.debug(req.user);
  resp.send(req.user);
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.post('/uploadCookPicture', requireAuth, uploader.single('file'), function(req, res) {
  if (req.file) {
    console.dir(req.file);
    return res.end('Thank you for the file');
  }
  res.end('Missing file');
});

app.post('/login', function(req, res){
    db.getUserInfo(req.body).then(function(userInfo) {
        console.log('results from /login', userInfo);
        if (userInfo) {
            console.log('user is registered');
            db.hashPass(req.body.password)
            .then(function(hash) {
                db.checkPass(req.body.password, hash)
                .then(function(match){
                    req.session.user = userInfo
                    res.json({
                        success: true,
                        userInfo: req.session.user
                    });
                })
                .catch(function(error) {
                    console.log(error);
                })
            })
        } else {
            console.log('user is not registered');
            res.json({
                success: false,
                message:"user is not registered"
            })
        }
    })
});

app.post('/createNewUser', function(req, res){
    console.log('body for /createNewUser', req.body);
    db.getUserInfo(req.body).then(function(userInfo) {
        if (!userInfo) {
            console.log('user is already registered');
            res.json({alreadyRegistered: true});
        } else {
            console.log('starting to create new user.');
            db.hashPass(req.body.password)
            .then(function(hash) {
                var newUserInfo = {
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    hashedpass:hash
                };
                db.registerNewUser(newUserInfo)
                .then(() => {
                    console.log('register new user successful');
                    res.json({ success: true })
                })
            })
        }
    })
});

app.get('/logout',function(req,res){
    req.session=null
    res.redirect('/')
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
    console.log("I'm listening on port " + port)
});

function requireAuth(req, res, next) {
    if (req.session.user) {
        return next()
    }
    res.redirect('/welcome')
}
