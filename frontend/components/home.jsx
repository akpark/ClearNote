var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var NotesIndex = require('./notes/index');
var History = require('react-router').History;

var Home = React.createClass({
  mixins: [History],

  handleSignInClick: function() {
    this.history.pushState(null, 'login');
  },

  handleSignUpClick: function() {
    this.history.pushState(null, 'register')
  },

  componentWillMount: function() {
    if (CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, 'home');
    }
  },

  render: function() {
    return (
        <div className="welcome-page">
          <div>Welcome to ClearNote!</div>
          <button className="" onClick={this.handleSignUpClick}>Sign Up</button>
          <button className="" onClick={this.handleSignInClick}>Sign In</button>
        </div>
    );
  }
});

module.exports = Home;
