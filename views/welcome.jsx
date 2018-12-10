var React = require('react');
import Style from 'style-it';
import Footer from './footer.jsx';

const bodyStyle = {
    backgroundColor: 'white'
  }
  
  const text = {
    paddingTop: '6.8em',
    paddingLeft: '27em',
    fontSize: '1.8em',
    fontFamily: "Helvetica Neue",
  };
  
  const joinText = {
    marginTop: '21em',
    paddingRight: '5.3em',
    fontSize: '1em',
    fontFamily: "Helvetica Neue"
  };

  const buttons = {
    marginTop: '22em',
    fontSize: '1em',
    fontFamily: "Helvetica Neue"
  };
  
  const twitterLogo = {
    fontSize: '3em',
    color: '#00aced'
  }

  class Welcome extends React.Component {
    render() {
      
      return <Style>
        {`
        .fab {
          position: absolute;
          margin-left: 780px;
          margin-top: 145px;
        }
        .text {
          position: absolute;
          float: right;
          font-weight: bold;
        }
        .text1 {
            position: absolute;
            float: right;
            font-weight: bold;
            margin-left: 780px;
          }
        button {
            width: 350px;
            border-radius: 20px;
            height: 30px;
            margin-top: 15px;
            margin-left: 780px;
        }
        .signup {
            background: #00aced;
            color: white;
        }
        a {
            color: inherit;
        }
        `}
        <div>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
          </head>
          <body style={bodyStyle}> 
            <i class="fab fa-twitter" style={twitterLogo}></i>
            <div class="text1" style={joinText}>Join Twitter197 today.</div>
            <div class="text" style={buttons}> 
            <a href="/signup"><button class="signup">Sign Up</button><br></br></a>
              <a href="/login"><button>Log In</button></a>
            </div>
            <div class="text" style={text}>See what's happening in <br></br>the world right now</div>
            
            <img src="twitter.png" alt="twitter" width="51%"></img>
            <div className="footer"><Footer/></div>
          </body>
        </div></Style>;
    }
  }

module.exports = Welcome; 