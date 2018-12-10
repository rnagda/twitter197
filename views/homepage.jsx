var React = require('react');
import Style from 'style-it';
import React from "react";
import { render } from "react-dom";
import Footer from './footer.jsx';

  const bodyStyle = {
    background: 'rgb(222, 236, 238)'
  }
  
  const twitterLogo = {
    fontSize: '1.2em',
    color: '#0084b4'
  }

  const proImg = {
    width: '65px',
    height: '65px',
    objectFit: 'cover',
    borderRadius: '50%',
    position: 'absolute',
    marginRight: '200px',
    marginTop: '200px'
  }

  const but = {
    visibility:'hidden'
  }

  class Home extends React.Component {
    render() {
        var thumbs = [];
        var str = [];
        for(var i = 0; i < this.props.user.pics.length; i++) {
            thumbs[i] = new Buffer(this.props.user.pics[i].buffer).toString('base64');
        }

        for(var i = 0; i < thumbs.length; i++) {
            str[i] = "data:image/jpeg;base64," + thumbs[i];
        }
        var images = [];
        for(var i = 0; i < str.length; i++) {
            images.push(<img style={proImg} src={str[i]} alt="First slide"/>);
        }
        var url = '/profile?handle=' + this.props.user.handle;
        var hand = this.props.user.handle;
      return <Style>
        {`
          .heading {
            height: 45px;
            width: 100%;
            border-radius: 0px;
            background-color: #00aced;
            color: white;
            position: fixed;
          }
          .btn-primary {
            background-color: #00aced; 
            padding: 2px;
            padding-left: 7px;
            padding-right: 7px; 
            height: 30px; 
            font-size: 13px; 
            border-radius: 0px; 
            border-color: rgb(60, 87, 141); 
            border-width: 1px;
            width: 28%;
            margin-left: 7.5%;
            margin-top: 200px;
            position: fixed;
          }
          .text {
            position: absolute;
            padding-top: 3px;
            padding-left: 25px;
            font-size: 29px;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
          }
          .textarea {
            width: 500px;
          }
          .spacer{
            width: 36%;
            margin-left: 62%;
            height: 45px;
          }
          .postbox {
            background: white;
            width: 46%;
            margin-left: 52%;
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
          .box {
            padding-left: 3%;
            padding-top: 0px;
            position: fixed;
            margin-top: 55px;
          }
          .statusbar {
            background: rgb(194, 195, 197);
            width: 28%;
            margin-left: 30%;
            margin-top: 50px;
            height: 30px;
            font-family:"Trebuchet MS", Helvetica, sans-serif; 
            font-size: 16px; 
            font-weight: 500; 
            padding: 4px;
          }
          h2 {
            position: absolute;
            color: white;
            margin-left: 275px;
            margin-top: 255px;
            font-size: 27px;
            z-index: 0;
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
          .form-group {
              position: fixed;
          }
          .btn1 {
            background-color: #00aced; 
            padding: 5px;
            height: 30px; 
            font-size: 14px; 
            width: 500px;
            margin-top: 160px;
            margin-left: 4.5%;
          }
          .search button:hover {
            background: #ccc;
          }
          .logout {
            color: white; border: none; text-decoration: none; margin-right: 5px;
          }
          .rts {
            color: rgb(95, 95, 95); fontSize: 13px; marginLeft: 10px; paddingTop: 5px;
          }
          .line {
            color: rgb(170, 166, 166); padding-left: 10px; font-size: 10px
          }
          .rt2 {
            float: right; marginRight: 10px;
          }
          .likebut {
            border: none; background: white; padding-top: 7px; padding-left: 69px; padding-right: 69px;
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
                <h3><a href={url} class="logout">@{hand}</a></h3>
                <h>|</h>
            </div>

            {/* <div>{images[0]}</div> */}
            <form id="form" action="" method="">
                <div class="box">
                    <textarea class="textarea" id="statusInput" name="statusInput" placeholder="What's happening?" rows="4"></textarea>
                </div>
                <input type="submit" value="Post" id="submit-tweet" class="btn btn-primary"></input>
            </form>
            
            <div class="spacer">
            </div>
            <div id="posts-here">
            </div>
          </body>
        </div></Style>;
    }
  }

module.exports = Home; 