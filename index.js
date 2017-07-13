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
        // console.log('results from /login', userInfo);
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

// getting profile info

app.get('/profile-info', function(req, res) {
    db.getUserProfileInfo(req.body).then(function(profileInfo) {
        if (profileInfo) {
            console.log('profile info receiving');
        } else {
            console.log('profile info could not received');
            res.json({
                success: false,
                message:"user is not registered"
        })
    }
})
});

// Search for tzpes of goods

let typegood= [];

app.get('/getAllTypeofGoods', (req, res) => {
    var typeIds = typegood.map(item => item.typeofgood_id);
    var typeNames = typegood.map(item => item.typeofgood_name);
    db.getTypeofGood(typeIds).then((typeResults) => {
        res.json({ results: typeResults });
    }).catch((err) => {
        console.log(err);
        res.json({ error: true });
    });
});

// Search for good names

let goodname= [];

app.get('/getNameofGoods', (req, res) => {
    var goodnameIds = goodname.map(item => item.good_id);
    var goodNames = goodname.map(item => item.good_name);
    console.log(goodnameIds);
    db.getNameofGood(goodnameIds).then((goodResults) => {
        res.json({ results: goodResults });
    }).catch((err) => {
        console.log(err);
        res.json({ error: true });
    });
});

// Search for recipe

app.get('/getrecipe', (req, res) => {
    db.findRecipe(req.query.goodId.split(',')).then((recipeResults) => {
        res.json({ results: recipeResults });
    }).catch((err) => {
        console.log(err);
        res.json({ error: true });
    });
});

// login status controller

app.get('/login-status', function(req,res) {
    if (req.session.user) {
        res.json ({ loggedIn: true });
    } else {
        res.json ({ loggedIn: false })
    }
});

app.post('/createNewUser', function(req, res){
    // console.log('body for /createNewUser', req.body);
    db.getUserInfo(req.body).then(function(userInfo) {
        if (!userInfo) {
            // console.log('user is already registered');
            res.json({alreadyRegistered: true});
        } else {
            // console.log('starting to create new user.');
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
                    // console.log('register new user successful');
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
