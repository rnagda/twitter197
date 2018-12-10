$(document).ready(function () {

    var tweets = [];
    var users = [];

    // kick off getting the questions

    getTweets();
    // now do it  every 2.5 seconds
    //setInterval(getTweets, 2500);

    function getTweets() {
        $.ajax({
            url: '/getTweets',
            type: 'GET',
            success: function(res) {
                tweets = res.tweets;
                users = res.allusers;
                renderPreviews();
            }
        })
    }

    function renderPreviews() {
        $('#posts-here').html(
            tweets.map((i) => '<div class="postbox" id="postbox"><div class="postnames">' + i.name + 
            '</div><div class="poststatus">' + i.text + '</div><div class="rts">' + i.likes + ' Likes <i class="far fa-heart"></i><div class="rt2">' +
            i.retweets + ' <i class="fas fa-retweet"></i> Retweets </div></div>  <div class="line">_______________________________________________________' +
            '_______________________________________________</div><button class="likebut" id="likebut">' + 
            '<i class="far fa-heart"></i> Like</button> | <button class="likebut" id="retweetbutton">' + 
            '<i class="fas fa-retweet"></i> Retweet</button></div>').join('')
        )
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

    // $('#posts-here').on('click', function(event) {
    //     $('#postbox').on('click', function(event) {

    //         console.log("Hi");
    //     })
    // })

    $('#posts-here').find("likebut").on("click", function(event) {
        alert("His");
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