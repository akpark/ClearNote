var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/home");
    }.bind(this));
  },

  handleGuestLogin: function () {
    var credentials = {username: "guest", password: "password"};
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/home");
    }.bind(this));
  },

  render: function() {
    return (
      <div className="sign-in">
        <form onSubmit={ this.submit }>

          <div className="input">
            <input type="text" name="username" placeholder="username or email"/>
          </div>

          <div className="input">
            <input type="password" name="password" placeholder="password"/>
          </div>

          <button>Log In</button>
        </form>

        <button id="guest-login-button"
                onClick={this.handleGuestLogin}>
                Guest Login</button>
      </div>
    );
  }
});

module.exports = SessionForm;
