var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('mongodb://twitter197:Amdfx8350@ds123664.mlab.com:23664/twitter197');
require('datejs');
// var autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(db);

var tweetSchema = new mongoose.Schema({
    tweetId: {type: Number, required: true, unique: true},
	name: {type: String, required: true, unique: false},
	handle: {type: String, required: true, unique: false},
	text: {type: String, required: true, unique: false},
    date: {type: Date, required: true, unique: false},
    likes: {type: Number, required: true, unique: false},
    retweets: {type: Number, required: true, unique: false},
	pic: [{type: Buffer, required: false, unique: false, index: false}],
});

tweetSchema.statics.getAll = function (callbackFunction) {
	return this.find({}, callbackFunction);
}

tweetSchema.statics.getAllByUser = function (handle, callbackFunction) {
	return this.find({handle: handle}, function(err, tweets) {
        callbackFunction(tweets);
    });
}

tweetSchema.statics.getTweetByID = function (id, callbackFunction) {
	return this.findOne({tweetId: id}, function(err, tweet) {
        callbackFunction(tweet);
      });
}

tweetSchema.statics.addRetweet = function (tweetId, callbackFunction) {
    this.findOneAndUpdate({tweetId: tweetId}, { $inc: {retweets: 1 } }, {
        upsert: true,
        returnNewDocument: true
    }, function(err, user) {
        callbackFunction();
    });
}

tweetSchema.statics.addLike = function (tweetId, callbackFunction) {
    this.findOneAndUpdate({tweetId: tweetId}, { $inc: {likes: 1 } }, {
        upsert: true,
        returnNewDocument: true
    }, function(err, user) {
        callbackFunction();
    });
}

tweetSchema.statics.addTweet = function (name, handle, text, pic, callbackFunction) {
    let coll = db.collection('tweets');
    var today = new Date()
    coll.count().then((count) => {
        var c = count + 1;
        var newTweet = new this({
            tweetId: c,
            name: name, 
            handle: handle, 
            text: text,
            date: today,
            likes: 0,
            retweets: 0,
            pic: pic
        });
        newTweet.save(function(err) {
            callbackFunction(err, count + 1);
        });
    });
	
}

//tweetSchema.plugin(autoIncrement.plugin, { model: 'Tweet', field: 'id' });
module.exports = db.model('Tweet', tweetSchema);