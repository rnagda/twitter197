var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('mongodb://twitter197:Amdfx8350@ds123664.mlab.com:23664/twitter197');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true, unique: false },
  handle: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: { type: Number },
  following: [{ type: String }],
  favorites: [{ type: Number }],
  tweets: [{ type: Number }],
  retweets: [{ type: Number }],
  pics: [{type: Buffer, required: false, unique: false, index: false}]
});


userSchema.statics.addUser = function (name, handle, password, pics, callbackFunction) {
  var newUser = new this({ name: name, handle: handle, password: password, followers: 0, following: [], favorites: [], tweets: [], retweets: [], pics: pics});
  this.findOne({handle: handle}, function (err, user) {
      if (!user) {
        newUser.save(callbackFunction);
      }
      else {
        callbackFunction();
      }
  });
}

userSchema.statics.getUser = function (handle, callbackFunction) {
  this.findOne({handle: handle}, function(err, user) {
    callbackFunction(user);
  });
}

userSchema.statics.getAllUsers = function (callbackFunction) {
  this.find(function(err, users) {
    callbackFunction(users);
  });
}

userSchema.statics.followUser = function (handle, userHandle, callbackFunction) {
  this.findOneAndUpdate({handle: handle}, { $addToSet: {following: userHandle} }, {
    upsert: true,
    returnNewDocument: true
  }, function(err, user) {
    callbackFunction(user);
  });
}

userSchema.statics.addFollower = function (handle, callbackFunction) {
  this.findOneAndUpdate({handle: handle}, { $inc: {followers: 1 } }, {
    upsert: true,
    returnNewDocument: true
  }, function(err, user) {
    callbackFunction(user);
  });
}

userSchema.statics.addFavorite = function (handle, tweetID, callbackFunction) {
  this.findOneAndUpdate({handle: handle}, { $addToSet: {favorites: tweetID} }, {
    upsert: true,
    returnNewDocument: true
  }, function(err, user) {
    callbackFunction(user);
  });
}

userSchema.statics.removeFavorite = function (handle, tweetID, callbackFunction) {
  this.findOneAndUpdate({handle: handle}, { $pull: {favorites: tweetID} }, {
    upsert: true,
    returnNewDocument: true
  }, function(err, user) {
    callbackFunction(user);
  });
}

userSchema.statics.addTweet = function (handle, tweetID, callbackFunction) {
    this.findOneAndUpdate({handle: handle}, { $addToSet: {tweets: tweetID} }, {
      upsert: true,
      returnNewDocument: true
    }, function(err, user) {
      callbackFunction(user);
    });
  }
  
  userSchema.statics.removeTweet = function (handle, tweetID, callbackFunction) {
    this.findOneAndUpdate({handle: handle}, { $pull: {tweets: tweetID} }, {
      upsert: true,
      returnNewDocument: true
    }, function(err, user) {
      callbackFunction(user);
    });
  }

  userSchema.statics.addRetweet = function (handle, tweetID, callbackFunction) {
    this.findOneAndUpdate({handle: handle}, { $addToSet: {retweets: tweetID} }, {
      upsert: true,
      returnNewDocument: true
    }, function(err, user) {
      callbackFunction(user);
    });
  }
  
  userSchema.statics.removeRetweet = function (handle, tweetID, callbackFunction) {
    this.findOneAndUpdate({handle: handle}, { $pull: {retweets: tweetID} }, {
      upsert: true,
      returnNewDocument: true
    }, function(err, user) {
      callbackFunction(user);
    });
  }

module.exports = db.model('User', userSchema);