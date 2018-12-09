var React = require('react');
import Style from 'style-it';

// Footer: jsx component responsible for displaying "Terms of Service" and "About" buttons. This
// footer component will be available on all pages. 

class Footer extends React.Component {

  render() {
      return <Style>

         {`

        body {
            background: #F0F8FF;
            position: relative;
        }
        .footer {
            height:24px;
            width: 100%; 
            background-image: none;
            background-repeat: repeat;
            background-attachment: scroll;
            background-position: 0% 0%;
            position: static;
            bottom: 0pt;
            left: 0pt;
            padding-bottom: 0.2em;
        }  
        .footer_contents {
            text-align: center;
            font-size: 18px;
            display: block;
            margin: 0 auto;
            color: #045ea7;
            font-family: Oswald, sans-serif;
        }
        .footer-link {
            color: #00144d;
        }
    `}
    <div>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous"/>
            <link rel="stylesheet" href="css/style.css"/>
            <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
        </head>
    
        <div className="footer">
            <div className="footer_contents">Created by <a className="footer-link" href="http://www.romitnagda.com">Romit Nagda</a></div> 
        </div>
    </div>
    </Style>;
  }
}

module.exports = Footer;