var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://twitter197:Amdfx8350@ds123664.mlab.com:23664/twitter197');
require('datejs');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var tweetSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: false},
	handle: {type: String, required: true},
	text: {type: String, required: true, unique: false},
    date: {type: Date, required: true},
    likes: {type: Number, required: true, unique: false},
    retweets: {type: Number, required: true, unique: false},
	pic: [{type: Buffer, required: false, unique: false, index: false}],
});

tweetSchema.statics.getAll = function (callbackFunction) {
	return this.find({}, callbackFunction);
}

tweetSchema.statics.getAllByUser = function (handle, callbackFunction) {
	return this.find({handle: handle}, callbackFunction);
}

tweetSchema.statics.getTweetByID = function (id, callbackFunction) {
	return this.findOne({id: id}, callbackFunction);
}

tweetSchema.statics.addTweet = function (name, handle, text, pic, callbackFunction) {
	var today = new Date().toString();
	var firstIndex = today.indexOf(' ');
	var temp = today.substring(firstIndex + 1, today.indexOf('20') + 4);
    var newTweet = new this({
        name: name, 
        handle: handle, 
        text: text,
        date: temp,
        likes: 0,
        retweets: 0,
        pic: pic
    });
    newTweet.save(callbackFunction);
}

tweetSchema.plugin(autoIncrement.plugin, { model: 'Tweet', field: 'id' });
module.exports = mongoose.model('Tweet', tweetSchema);