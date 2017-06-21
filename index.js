const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const port = process.env.PORT || 8080;
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended : false }));


if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

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
