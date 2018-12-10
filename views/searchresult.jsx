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

  

  class SearchResult extends React.Component {
    render() {
        var answers = [];
        console.log(this.props.results.length);
        for (var j = 0; j < this.props.results.length; j++) {
            var url = "/profile?handle=" + this.props.results[j].handle;
            var img = "data:image/jpeg;base64," + new Buffer(this.props.results[j].pics[0]).toString('base64');
            var line = 
            (<a href={url}><div class="searchresult">
                <a class="name" href={url}>{this.props.results[j].name}</a>
                <img class="postimage" src={img}></img>
                <div class="affiliation">Handle: @{this.props.results[j].handle}</div>
            </div></a>);
            answers.push(line);
        }
        var h = this.props.results.length * 150;
        const box = {
            height: h
        }
          
      return <Style>
        {`
          .heading {
            height: 45px;
            width: 100%;
            border-radius: 0px;
            background-color: #00aced;
            color: white;
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
            width: 28%;
            margin-left: 30%;
          }
          .text {
            position: absolute;
            padding-top: 3px;
            padding-left: 25px;
            font-size: 29px;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
          }
          .textarea {
            width: 40%;
          }
          .searchresult {
            width: 90%;
            float: left;
            margin-left: 5%;
            height: 100px;
            margin-top: 25px;
            background: rgb(222, 236, 238);
            border-radius: 10px;
        }
        .box {
          width: 55%;
          margin-left: 20%;
          background: white;
          margin-top: 20px;
          height: 800px;
        }
        .name {
          font-family:"Trebuchet MS", Helvetica, sans-serif; 
          font-size: 18px; 
          font-weight: 500; 
          float: left;
          padding-left: 105px;
          padding-top: 20px;
          line-height: 30px;
          color:#43609C;
        }
        .affiliation {
          font-family:"Trebuchet MS", Helvetica, sans-serif; 
          font-size: 15px; 
          font-weight: 500; 
          float: left;
          padding-top: 48px;
          line-height: 30px;
          color:#43609C;
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
          .search button:hover {
            background: #ccc;
          }
          .logout {
            color: white; border: none; text-decoration: none; margin-right: 5px;
          }
          .postimage {
            width: 68px; height: 68px; object-fit: cover; border-radius: 50%; margin: 15px; margin-left: 200px;
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
                <h3><a href="/wall" class="logout">Romit</a></h3>
                <h>|</h>
            </div>
            <div class="box" style={box}>
                {answers}
            </div>
          </body>
        </div></Style>;
    }
  }

module.exports = SearchResult; 