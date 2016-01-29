var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    //TODO:what does serializing json do??
    debugger;
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {
    debugger
    return (
      <div className="sign-in">
        <h1>Sign in</h1>
        <form onSubmit={ this.submit }>

          <div className="input">
            <label>Email address or username
            <input type="text" name="user[username]"/>
            </label>
          </div>

          <div className="input">
            <label>Password
            <input type="password" name="user[password]"/>
            </label>
          </div>

          <button>Log In!</button>
        </form>
      </div>
    );
  }
});

module.exports = SessionForm;
