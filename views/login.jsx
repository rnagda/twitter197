var React = require('react');
import Style from 'style-it';
import Footer from './footer.jsx';

const bodyStyle = {
    backgroundColor: 'white'
  }
  const joinText = {
    marginTop: '13em',
    paddingRight: '5.3em',
    fontSize: '1em',
    fontFamily: "Helvetica Neue"
  };

  const buttons = {
    marginTop: '15em',
    fontSize: '1em',
    fontFamily: "Helvetica Neue",
    width: '250px'
  };
  
  const twitterLogo = {
    fontSize: '3em',
    color: '#00aced'
  }

  class Login extends React.Component {
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
          margin-left: 775px;
          font-weight: bold;
        }
        .text1 {
            position: absolute;
            float: right;
            font-weight: bold;
            margin-left: 780px;
        }
        a {
            color: inherit;
        }
        .btn-success {
            background-color: #00aced;
        }
        .btn-success:hover {
            background-color: #0084b4;
        }
        `}
        <div>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
          </head>
          <body style={bodyStyle}> 
            <i class="fab fa-twitter" style={twitterLogo}></i>
            <div class="text1" style={joinText}>Sign In.</div>
            <div class="text" style={buttons}> 
                <form action="/checklogin" method="post" class="needs-validation" novalidate>
                    <div class="form-group" >
                        <input type="text" class="form-control" name="email" id="email" placeholder="Enter handle" required></input>
                    </div>
                    <div class="form-group" >
                        <input type="password" class="form-control" name="password" id="password" placeholder="Enter password" required></input>
                    </div>
                    <input type="submit" value="Sign In" class="btn btn-success"></input>
                </form>
            </div>
            
            <img src="twitter.png" alt="twitter" width="51%"></img>
            <div className="footer"><Footer/></div>
          </body>
        </div>
        
        </Style>;
    }    
  }

module.exports = Login; 