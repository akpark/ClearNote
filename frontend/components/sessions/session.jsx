var React = require('react');
var SessionForm = require('./user_form');
var UserForm = require('./new');

var Session = React.createClass({

  componentDidMount: function () {
    $('.sign-up').hide();
  },

  handleSignInClick: function () {
    $('.sign-up').hide();
    $('.sign-in').show();
  },

  handleRegisterClick: function () {
    $('.sign-in').hide();
    $('.sign-up').show();
  },

  render: function () {
    return (
      <div className="welcome-page">
        <div className="welcome-page-form">
          <button className="register-button" onClick={this.handleRegisterClick}>Sign Up</button>
          <button className="sign-in-button" onClick={this.handleSignInClick}>Login</button>
          <SessionForm />
          <UserForm />
        </div>
      </div>
    )
  }

});

module.exports = Session;
