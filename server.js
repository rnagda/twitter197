var express = require('express');
var User = require('./User');
var Tweet = require('./Tweet');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer();
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({ 
    secret: 'secret', 
    saveUninitialized: true, 
    resave: false, 
    unset: 'destroy' 
}));

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  if (req.user) {
    User.addUser(req.user.displayName, req.user.emails[0].value, function (err) {
      User.getUser(req.user.emails[0].value, function(user) {
        res.render('home', { user: user });
      });
    });
  } else {
    res.render('welcome');
  }
});

app.get('/login', function(req, res) {
  console.log(req.user);
  if (req.user) {
    User.addUser(req.user.displayName, req.user.emails[0].value, function (err) {
      User.getUser(req.user.emails[0].value, function(user) {
        res.render('home', { user: user });
      });
    });
  } else {
    res.render('login');
  }
});

app.get('/signup', function(req, res) {
  if (req.user) {
    User.addUser(req.user.displayName, req.user.emails[0].value, function (err) {
      User.getUser(req.user.emails[0].value, function(user) {
        res.render('home', { user: user });
      });
    });
  } else {
    res.render('signup');
  }
});

app.post('/signup', upload.array('photo'), function(req, res) {
  var propic = req.files[0].buffer;
  var coverpic = req.files[1].buffer;
  console.log(req.body);
  User.addUser(req.body.name, req.body.handle, req.body.password, propic, coverpic, function (err) {
    if(err) {
      console.log(err);
    } 
    res.redirect('/home');
  });
});

app.get('/home', function(req, res) {
  res.send('success');
})

app.listen(process.env.PORT || 3000);