var React = require('react');
var ReactDOM = require('react-dom');
import Style from 'style-it';
import React from "react";

  const bodyStyle = {
    background: 'rgb(222, 236, 238)'
  }
  
  const twitterLogo = {
    fontSize: '1.2em',
    color: '#0084b4'
  }

  const followBut = {
    width: '100px',
    height: '30px',
    position: 'fixed',
    borderRadius:'20px',
    marginLeft: '625px',
    marginTop: '300px',
    background: 'white',
    borderWidth: '2px',
    border: '#0084b4'
  }  

  const rts = {
    color: 'rgb(95, 95, 95)', fontSize: '13px', marginLeft: '10px', paddingTop: '5px'
  }
  
  const rt2 = {
    float: 'right', marginRight: '10px'
  }
  
  class Welcome extends React.Component {

    
    render() {
        var thumbs = [];
        var str = [];
        var posts = [];
        for(var i = 0; i < this.props.user.pics.length; i++) {
            thumbs[i] = new Buffer(this.props.user.pics[i].buffer).toString('base64');
        }

        for(var i = 0; i < thumbs.length; i++) {
            str[i] = "data:image/jpeg;base64," + thumbs[i];
        }
        var images = [];
        for(var i = 0; i < str.length; i++) {
            if (i == 0) {
                images.push(<img class="profilearea" src={str[i]} alt="First slide"/>);
            } else {
                images.push(<img class="coverarea" src={str[i]} alt="Second slide"/>);
            }
        }
        var name = this.props.user.name;
        var followButton = []
        if (this.props.user.handle != this.props.currUser.handle) {
            if (this.props.currUser.following.includes(this.props.user.handle)) {
                followButton.push(<button style={followBut}>Following</button>)
            } else {
                followButton.push(<button id="followBut" style={followBut} value={this.props.user.handle}>+ Follow</button>);
            }
        }
        var label = "Your";
        if (this.props.user.handle != this.props.currUser.handle) {
            label = this.props.user.name + "'s";
        }
        var tweets = [];
        var users = this.props.allUsers;
        var temp = this.props.tweets;
        temp.sort(function(a, b){return b.tweetId - a.tweetId});
        for (var j = 0; j < temp.length; j++) {
            var tweeter = users.find(function(element) {
                if(element.handle == temp[j].handle) {
                    return element;
                }
            })
            var str = "data:image/jpeg;base64," + new Buffer(tweeter.pics[0].buffer).toString('base64');
            if (temp[j].handle == this.props.user.handle) {
                // My own tweet
                tweets.push(
                    <div class="postbox" id="postbox">
                        <img class="postimage" src={str} alt="Second slide"/>
                        <div class="postnames">
                            {temp[j].name}
                        </div>
                        <div class="postdate">
                            {(temp[j].date.getMonth() + 1) + '/' + (temp[j].date.getDay()) + ' at ' + (temp[j].date.getHours()) + ':' + ((temp[j].date.getMinutes()<10?'0':'') + temp[j].date.getMinutes()) }
                        </div>
                        <div class="poststatus">
                            {temp[j].text}
                        </div>
                        <div style={rts}>
                            {temp[j].likes} Likes <i class="far fa-heart"></i>
                            <div style={rt2}>
                                {temp[j].retweets}  <i class="fas fa-retweet"></i> Retweets
                            </div>
                        </div>
                    </div>
                )
            } else {
                // Retweet
                tweets.push(
                    <div class="postbox" id="postbox">
                        <img class="postimage" src={str} alt="Second slide"/>
                        <div class="postnames">
                            {temp[j].name}
                        </div>
                        <div class="postdate">
                            {(temp[j].date.getMonth() + 1) + '/' + (temp[j].date.getDay()) + ' at ' + (temp[j].date.getHours()) + ':' + ((temp[j].date.getMinutes()<10?'0':'') + temp[j].date.getMinutes()) }
                        </div>
                        <div class="poststatus">
                            {temp[j].text}
                        </div>
                        <div style={rts}>
                            {temp[j].likes} Likes <i class="far fa-heart"></i>
                            <div style={rt2}>
                                {temp[j].retweets}  <i class="fas fa-retweet"></i> Retweets
                            </div>
                        </div>
                    </div>
                )
            }
        }
        var proUrl = '/profile?handle=' + this.props.currUser.handle;
        var tweetNum = this.props.user.tweets.length;
        var followers = this.props.user.followers;
        var following = this.props.user.following.length;
        var likes = this.props.user.favorites.length;

      return <Style>
        {`
          .heading {
            height: 45px;
            width: 100%;
            border-radius: 0px;
            background-color: #00aced;
            color: white;
            z-index: 100;
            position:fixed;
          }
          .btn-primary {
            background-color: rgb(73, 108, 177); 
            padding: 2px;
            padding-left: 7px;
            padding-right: 7px; 
            height: 30px; 
            font-size: 13px; 
            border-radius: 0px; 
            border-color: rgb(60, 87, 141); 
            border-width: 1px;
            width: 36%;
            margin-left: 1%;
          }
          .text {
            position: absolute;
            padding-top: 0px;
            padding-left: 35px;
            font-size: 29px;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
          }
          .coverarea {
              width: 58%;
              margin-left: 2%;
              margin-top: 55px;
              height: 300px;
              background: rgb(187, 186, 186);
              z-index: -1;
              position: fixed;
              object-fit: cover
          }
          .profilearea {
              border-radius: 50%;
              position: fixed;
              width: 175px;
              height: 175px;
              background: white;
              align: left;
              margin-left: 50px;
              margin-top: 275px;
              padding: 3.5px;
              z-index: 1;
              object-fit: cover
          }
          .optionbar {
              width: 58%;
              background: white;
              margin-left: 2%;
              height: 75px;
              margin-top: 355px;
              position: fixed;
              z-index: -1;
          }
          .textarea {
            width: 54.5%;
          }
          .box {
            padding-left: 34%;
            padding-top: 0px;
          }
          .statusbar {
            background: rgb(194, 195, 197);
            width: 36%;
            margin-left: 34%;
            margin-top: 15px;
            height: 30px;
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 16px; 
            font-weight: 500; 
            padding: 4px;
          }
          .spacer{
            width: 36%;
            margin-left: 62%;
            height: 45px;
          }
          .postbox {
            background: white;
            width: 36%;
            margin-left: 62%;
            margin-top: 20px;
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 16px; 
            font-weight: 500; 
            padding: 12px;
          }
          .postnames {
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            color:#43609C;
            font-weight: bold;
            padding-top: 3px;
            font-size: 14.5px;
            margin-left: 49px;
          }
          h2 {
            position: fixed;
            color: white;
            margin-left: 275px;
            margin-top: 255px;
            font-size: 27px;
            z-index: 1;
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
          }
          h3 { 
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 14px; 
            font-weight: 500; 
            float: right;
            padding-right: 17px;
            padding-top: 8px;
            line-height: 30px;
          }
          h4 {
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 14px; 
            font-weight: 500; 
            float: right;
            padding-right: 220px;
            padding-top: 8px;
            line-height: 30px;
          }
          h5 {
            color: #0084b4;
            margin-left: 63%;
            margin-top: 10px;
            font-size: 27px;
            font-family:"Trebuchet MS", Helvetica, sans-serif;
            z-index: 0;
          }
          h {
            font-size: 18px;
            float: right;
            padding-top: 8px;
            padding-right: 15px;
            color: rgb(64, 70, 160);
          }
          .ui-autocomplete {
              background: white;
              border-radius: 0px;
              list-style: none;
              width: 30%;
              float:left;
              padding-left: 5px;
          }
          .ui-menu .ui-menu-item a{
              color: black;
              height: 16px;
              font-size: 14px;
              width: 100%;
          }
          .search {
            float: left;
          }
          .search input[type=text] {
            padding: 3px;
            margin-top: 8px;
            margin-left: 80px;
            width: 500px;
            font-size: 14px;
            border: none;
          }
          .search button {
            float: right;
            padding: 3px 10px;
            margin-top: 8px;
            margin-right: 16px;
            background: rgb(230, 228, 228);
            font-size: 14px;
            border: none;
            cursor: pointer;
          }
          .search button:hover {
            background: #ccc;
          }
          .postimage {
            width: 43px; height: 43px; object-fit: cover; border-radius: 50%; position: absolute;
          }
          .postdate { 
            color: rgb(95, 95, 95); font-size: 12px; margin-left: 49px;
          }
          .poststatus {
            padding-left: 10px; padding-top: 15px; padding-right: 10px;
          }
          .comments { 
            background: rgba(224, 224, 224, 0.377);
            border-radius: 15px;
            width: 90%;
            padding: 6px;
            margin-top: 13px;
            margin-left: 40px;
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 13px; 
            font-weight: 500;
          }
          .commentbox {
            background: rgba(224, 224, 224, 0.377);
            border-width: thin;
            border-color: rgb(90, 90, 90);
            width: 100%;
            border-radius: 15px;
            margin-top: 13px;
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 13px; 
            font-weight: 500; 
            padding: 6px;
          }
          .commentimage {
            width: 35px; height: 35px; object-fit: cover; border-radius: 50%; position: absolute; margin-top: 13px;
          }
          .commentname {
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            color:#43609C;
            font-weight: bold;
            padding-top: 3px;
            font-size: 14.5px;
            display: inline;
          }
          .commenttext {
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            color:black;
            padding-top: 3px;
            font-size: 14.5px;
            padding-left: 2px;
            display: inline;
          }
          .interestsbox {
            width: 28%;
            background: white;
            height: 800px;
            float: left;
            margin-top: 15px;
            margin-left: 5%;
          }
          .logout {
            color: white; border: none; text-decoration: none; margin-right: 5px;
          }
          .followertext {
              color: black;
              font-size: 30px;
          }
        `}
        <div>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"></link>
            <meta charset="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
            <script src="/static/scripts/lib/jquery.min.js"></script>
            <script src="/main.js"></script>
        
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
            
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            <title>twitter197</title>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
          </head>

          <body style={bodyStyle}> 
            <div class="heading">
                <div class="text"><b> <i class="fab fa-twitter" style={twitterLogo}></i></b></div>
                <div class="search">
                    <form class="form-group" action="/searchresults" method="post">
                        <input type="text" placeholder="Search" id="searchBar" name="searchBar"></input>
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <h3><a href="/logout" class="logout">Logout</a></h3>
                <h>|</h>
                <h3><a href="/homepage" class="logout">Home</a></h3>
                <h>|</h>
                <h3><a href={proUrl} class="logout">@{this.props.currUser.handle}</a></h3>
                <h>|</h>
            </div>

            <div>
                {images[1]}
                {images[0]}
                <h2>{name}</h2>
            </div>
            <div class="optionbar">
                {/* <div class="followertext">{tweetNum}</div> */}
            </div>
            <div>
                {followButton}
            </div>
            <div>
                <div class="spacer"></div>
                <h5>{label} tweets</h5>
                {tweets}
            </div>
          </body>
        </div></Style>;
    }
  }
module.exports = Welcome; 