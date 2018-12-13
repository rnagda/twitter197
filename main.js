$(document).ready(function () {

    var tweets = [];
    var users = [];
    var currUser;
    // kick off getting the questions

    getTweets();
    // now do it  every 2.5 seconds
    setInterval(getTweets, 2500);

    function getTweets() {
        $.ajax({
            url: '/getTweets',
            type: 'GET',
            success: function(res) {
                tweets = res.tweets;
                users = res.allusers;
                currUser = res.curruser;
                renderPreviews();
            }
        })
    }

    function renderPreviews() {
        $('#posts-here').empty();
        for (var i = 0; i < tweets.length; i++) {
            if (currUser.retweets.includes(tweets[i].tweetId)) {
                if (currUser.favorites.includes(tweets[i].tweetId)) {
                    $('#posts-here').append('<div class="postbox" id="postbox"><img class="postimage" src="' + tweets[i].pic[0] + '"></img><div class="postnames">' + tweets[i].name + 
                    '<div class="retweetlabel"> You retweeted </div></div><div class="posthandle">@' + tweets[i].handle + '</div><div class="poststatus">' + tweets[i].text + '</div><div class="rts">' + tweets[i].likes + ' Likes <i class="far fa-heart"></i><div class="rt2">' +
                        tweets[i].retweets + ' <i class="fas fa-retweet"></i> Retweets </div></div>  <div class="line">_______________________________________________________' +
                        '_________________________________________________</div><button class="likebut" value="' + tweets[i].tweetId + '" id="likedbut">' + 
                        '<i class="fas fa-heart"></i> Liked</button> | <button class="likebut" value="' + tweets[i].tweetId + '" id="retweetedbutton">' + 
                        '<i class="fas fa-retweet"></i> Retweeted</button></div>')
                } else {
                    $('#posts-here').append('<div class="postbox" id="postbox"><img class="postimage" src="' + tweets[i].pic[0] + '"><div class="postnames">' + tweets[i].name + 
                    '<div class="retweetlabel"> You retweeted </div></div><div class="posthandle">@' + tweets[i].handle + '</div><div class="poststatus">' + tweets[i].text + '</div><div class="rts">' + tweets[i].likes + ' Likes <i class="far fa-heart"></i><div class="rt2">' +
                    tweets[i].retweets + ' <i class="fas fa-retweet"></i> Retweets </div></div>  <div class="line">_______________________________________________________' +
                    '_________________________________________________</div><button class="likebut" value="' + tweets[i].tweetId + '" id="likebut">' + 
                    '<i class="far fa-heart"></i> Like</button> | <button class="likebut" value="' + tweets[i].tweetId + '" id="retweetedbutton">' + 
                    '<i class="fas fa-retweet"></i> Retweeted</button></div>')
                }
            } else if (currUser.favorites.includes(tweets[i].tweetId)) {
                $('#posts-here').append('<div class="postbox" id="postbox"><img class="postimage" src="' + tweets[i].pic[0] + '"><div class="postnames">' + tweets[i].name + 
                    '</div><div class="posthandle">@' + tweets[i].handle + '</div><div class="poststatus">' + tweets[i].text + '</div><div class="rts">' + tweets[i].likes + ' Likes <i class="far fa-heart"></i><div class="rt2">' +
                    tweets[i].retweets + ' <i class="fas fa-retweet"></i> Retweets </div></div>  <div class="line">_______________________________________________________' +
                    '_________________________________________________</div><button class="likebut" value="' + tweets[i].tweetId + '" id="likedbut">' + 
                    '<i class="fas fa-heart"></i> Liked</button> | <button class="likebut" value="' + tweets[i].tweetId + '" id="retweetbutton">' + 
                    '<i class="fas fa-retweet"></i> Retweet</button></div>')
            } else {
                $('#posts-here').append('<div class="postbox" id="postbox"><img class="postimage" src="' + tweets[i].pic[0] + '"><div class="postnames">' + tweets[i].name + 
                    '</div><div class="posthandle">@' + tweets[i].handle + '</div><div class="poststatus">' + tweets[i].text + '</div><div class="rts">' + tweets[i].likes + ' Likes <i class="far fa-heart"></i><div class="rt2">' +
                    tweets[i].retweets + ' <i class="fas fa-retweet"></i> Retweets </div></div>  <div class="line">_______________________________________________________' +
                    '_________________________________________________</div><button class="likebut" value="' + tweets[i].tweetId + '" id="likebut">' + 
                    '<i class="far fa-heart"></i> Like</button> | <button class="likebut" value="' + tweets[i].tweetId + '" id="retweetbutton">' + 
                    '<i class="fas fa-retweet"></i> Retweet</button></div>')
            }
        }
        
    }
   
    $('#submit-tweet').on('click', function (event) {
        event.preventDefault();
        var tweet = $('#statusInput').val();
        if (tweet != '') {
            $.ajax({
                url: '/sendtweet',
                type: 'POST',
                data: {tweet: tweet},
                success: function() {
                    setInterval(getTweets(), 2500);
                    $('#statusInput').val('');
                }
            })
        }
    });

    $('#posts-here').on('click', "#likebut", function(event) {
        var tweetId = $(this).val();
        $.ajax({
            url: '/liketweet',
            type: 'POST',
            data: {tweetId: tweetId},
            success: function() {
                setInterval(getTweets(), 2500);
            }
        })
    })
    
    $('#posts-here').on('click', "#retweetbutton", function(event) {
        var tweetId = $(this).val();
        $.ajax({
            url: '/retweet',
            type: 'POST',
            data: {tweetId: tweetId},
            success: function() {
                setInterval(getTweets(), 2500);
            }
        })
    })

    $('#followBut').on('click', function(event) {
        var user = $('#followBut').val();
        $.ajax({
            url: '/followuser',
            type: 'POST',
            data: {user: user},
            success: function() {
                $('#followBut').text('Following');
            }
        })
    })
    
});