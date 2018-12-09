var mongoose = require('mongoose');
mongoose.createConnection('mongodb://twitter197:Amdfx8350@ds123664.mlab.com:23664/twitter197');
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
  propic: {type: Buffer, required: true, unique: false, index: false},
  coverpic: {type: Buffer, required: true, unique: false, index: false}
});

userSchema.statics.addUser = function (name, handle, password, propic, coverpic, callbackFunction) {
  console.log('reached');
  var newUser = new this({ name: name, handle: handle, password: password, followers: 0, following: [], favorites: [], tweets: [], retweets: [], propic: propic, coverpic: coverpic});
  console.log('reached');
  newUser.save(function(err) {
    console.log('reached');
    console.log(err);
    callbackFunction(err);
  });
  // this.findOne({handle: handle}, function (err, user) {
    //   console.log(user);
    //   if (!user) {
    //     newUser.save(callbackFunction);
    //   }
    //   else {
    //     callbackFunction();
    //   }
    // });
}

userSchema.statics.getUser = function (handle, callbackFunction) {
  this.findOne({handle: handle}, function(err, user) {
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

module.exports = mongoose.model('User', userSchema);