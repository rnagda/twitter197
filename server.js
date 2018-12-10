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
  res.render('welcome');
});

app.get('/login', function(req, res) {
  if (req.session.handle == undefined) {
    res.render('login');
  } else {
    res.redirect('/home');
  }
});

app.post('/login', function(req, res) {
  User.getUser(req.body.handle, function(user) {
    if (user != null && user.password == req.body.password) {
      req.session.handle = req.body.handle;
      req.session.name = user.name;
      res.redirect('/home');
    } else {
      res.redirect('/login');
    }
  });
});

app.get('/signup', function(req, res) {
  if (req.session.handle == undefined) {
    res.render('signup');
  } else {
    res.redirect('/home');
  }
});

app.post('/signup', upload.array('photo'), function(req, res) {
  var photos = [];
  for(var i = 0; i < req.files.length; i++) {
    photos[i] = req.files[i].buffer;
  }
  User.addUser(req.body.name, req.body.handle, req.body.password, photos, function (err) {
    if(err) {
      console.log(err);
    } 
    req.session.name = req.body.name;
    req.session.handle = req.body.handle;
    res.redirect('/home');
  });
});

app.get('/home', function(req, res) {
  if (req.session.handle == undefined) {
    res.redirect('/');
  } else {
    User.getUser(req.session.handle, function(user) {
      res.render('homepage', {user: user});
    })
  }
})

app.get('/profile?', function(req, res) {
  if (req.session.handle == undefined) {
    res.redirect('/');
  } else {
    User.getUser(req.query["handle"], function(user) {
      if (user == null) {
        res.redirect('/home');
      } else {
        User.getUser(req.session.handle, function(currUser) {
          var t = [];
          var count = 0;
          console.log(user.tweets);
          for (var i = 0; i < user.tweets.length; i++) {
            Tweet.getTweetByID(user.tweets[i], function(tweet){
              t.push(tweet);
              count++;
              if (count == user.tweets.length) {
                User.getAllUsers(function(users) {
                  res.render('profile', {user: user, currUser: currUser, tweets: t, allUsers: users});
                })
              }
            })
          }
        })
      }
    })
  }
})

app.post('/sendtweet', upload.array('photo'), function(req, res) {
  if (req.session.handle == null) {
    res.redirect('/');
  }
  var photos = [];
  if (req.files) {
    for(var i = 0; i < req.files.length; i++) {
      photos[i] = req.files[i].buffer;
    }
  }
  Tweet.addTweet(req.session.name, req.session.handle, req.body.tweet, photos, function(err, tweetid) {
    if (err) {
      console.log(err);
    } else {
      User.addTweet(req.session.handle, tweetid, function(err) {
        res.send('success');
      })
    }
  })
})

app.get('/getTweets', function (req, res) {
  if(req.session.handle != null) {
    User.getUser(req.session.handle, function(user) {
      var alltweets = [];
      var count = 0;
      for (var i = 0; i < user.following.length; i++) {
        Tweet.getAllByUser(user.following[i], function(tweets) {
          tweets.forEach(function(element) {
            alltweets.push(element);
          })
        });
        count++;
      }
      if (count == user.following.length) {
        Tweet.getAllByUser(req.session.handle, function(myTweets) {
          myTweets.forEach(function(el) {
            alltweets.push(el);
          })
          alltweets.sort(function(a, b){return b.tweetId - a.tweetId});
          User.getAllUsers(function(users) {
            res.json({ 
              tweets: alltweets, 
              allusers: users
            })
          })
        })
      }
    })
  } else {
    res.json({ 
      tweets: null, 
      allusers: null
    })
  }
});

app.post('/retweet', function(req, res) {
  if (req.session.handle == null) {
    res.redirect('/');
  }
  User.addTweet(req.session.handle, tweetid, function(err) {
    User.addRetweet(req.session.handle, tweetid, function(err) {
      res.send('success');
    })
  })
})

app.post('/liketweet', function(req, res) {
  if (req.session.handle == null) {
    res.redirect('/');
  }
  User.addFavorite(req.session.handle, tweetid, function(err) {
    res.send('success');
  })
})

app.post('/followuser', function(req, res) {
  if (req.session.handle == null) {
    res.redirect('/');
  }
    var user = req.body.user;
    User.followUser(req.session.handle, user, function(userBack) {
      User.addFollower(user, function(userBack2) {
        res.send('success');
      })
    })
})

app.post('/searchresults', function(req, res) {
  if (req.session.handle == null) {
    res.redirect('/');
  }
  var query = req.body.searchBar;
  var results = [];
  User.getAllUsers(function(users) {
    var count = 0;
    for (var i = 0; i < users.length; i++) {
      if (users[i].name.includes(query) || users[i].handle.includes(query)) {
        if (users[i].handle != req.session.handle) {
          results.push(users[i]);
        }
      }
      count++;
    }
    if (count == users.length) {
      User.getUser(req.session.handle, function(user) {
        res.render('searchresult', {user: user, results: results});
      });
    }
  });
})

app.get('/logout', function(req, res) {
  req.session.destroy();
	res.redirect('/');
})

app.get('/*', function(req, res) {
  if (req.session.handle == undefined) {
    res.redirect('/');
  } else {
    res.redirect('/home');
  }
})

app.listen(process.env.PORT || 3000);