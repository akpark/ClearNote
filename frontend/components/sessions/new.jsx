var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/notes");
    }.bind(this));
  },

  render: function() {
    return (
      <div className="sign-in">
        <h1>Sign in</h1>
        <form onSubmit={ this.submit }>

          <div className="input">
            <label>Email address or username
            <input type="text" name="username"/>
            </label>
          </div>

          <div className="input">
            <label>Password
            <input type="password" name="password"/>
            </label>
          </div>

          <button>Log In!</button>
        </form>
      </div>
    );
  }
});

module.exports = SessionForm;
