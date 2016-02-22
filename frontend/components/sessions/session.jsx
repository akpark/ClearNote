var React = require('react');
var SessionForm = require('./user_form');
var UserForm = require('./new');
var CurrentUserStore = require('../../stores/current_user_store');
var SessionsApiUtil = require('../../util/sessions_api_util');
var ErrorStore = require('../../stores/error_store');

var History = require('react-router').History;

var Session = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { errors: ErrorStore.all() }
  },

  componentWillMount: function () {
    this.errorListener = ErrorStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ errors: ErrorStore.all() })
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
  },

  componentDidMount: function () {
    $('.sign-up').hide();
    $('.sign-in-button').css("opacity", 0.7);
  },

  handleSignInClick: function () {
    //keep signin highlighted
    debugger
    $('.register-button').css("opacity", 1);
    $('.sign-in-button').css("opacity", 0.7);
    $('.sign-up').hide();
    $('.sign-in').show();
  },

  handleRegisterClick: function () {
    //keep register highlighted
    $('.sign-in-button').css("opacity", 1);
    $('.register-button').css("opacity", 0.7);
    $('.sign-in').hide();
    $('.sign-up').show();
  },

  render: function () {
    var errors = this.state.errors.map(function (error, key) {
      return <div className="error" key={key}>{error}</div>;
    });
    if (this.state.errors.length > 0) {
      $('.errors').fadeIn('slow').delay(2000).fadeOut('fast');
    }

    return (
      <div className="welcome-page">
        <div className="welcome-page-form">
          <button className="register-button" onClick={this.handleRegisterClick}>Sign Up</button>
          <button className="sign-in-button" onClick={this.handleSignInClick}>Login</button>
          <SessionForm />
          <UserForm />
          <div className="errors">{errors}</div>
        </div>
      </div>
    )
  }

});

module.exports = Session;
