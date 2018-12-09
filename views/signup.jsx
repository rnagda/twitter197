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
    marginTop: '14em',
    fontSize: '1em',
    fontFamily: "Helvetica Neue",
    width: '250px'
  };
  
  const twitterLogo = {
    fontSize: '3em',
    color: '#00aced'
  }

  class SignUp extends React.Component {
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
        .form-control {
            margin-top: 15px;
        }
        .input-group-addon {
            margin-top: 15px;
        }
        .form-group {
            margin-top: 10px;
        }
        `}
        <div>
          <head>
            <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"></link>
          </head>
          <body style={bodyStyle}> 
            <i class="fab fa-twitter" style={twitterLogo}></i>
            <div class="text1" style={joinText}>Sign Up.</div>
            <div class="text" style={buttons}> 
                <form className="form" method="post" encType="multipart/form-data">
                    <input type="text" className="form-control" placeholder="Name" 
                    name="name" required/>
                    <div class="input-group mb-1 mr-sm-1 mb-sm-0">
                        <div class="input-group-addon">@</div>
                        <input type="text" className="form-control" placeholder="Handle" 
                        name="handle" required/>
                    </div>
                    <input type="password" className="form-control" placeholder="Password" 
                    name="password" required/>
                    <div className="form-group labelStyle fileStyle">
                        <label class="space">Profile picture: </label>
                        <input type="file" placeholder="Upload File" name="photo" required
                        accept=".jpg,.jpeg,.png"/>
                    </div>  
                    <div className="form-group labelStyle fileStyle">
                        <label class="space">Cover picture: </label>
                        <input type="file" placeholder="Upload File" name="photo" required
                        accept=".jpg,.jpeg,.png"/>
                    </div>  
                    <input type="submit" value="Sign Up" class="btn btn-success"></input>
                </form>
            </div>
            
            <img src="twitter.png" alt="twitter" width="51%"></img>
            <div className="footer"><Footer/></div>
          </body>
        </div>
        
        </Style>;
    }    
  }

module.exports = SignUp; 