var React = require('react');
var SessionsApiUtil = require('../../util/sessions_api_util');
var CurrentUserStore = require('../../stores/current_user_store');
var SessionsApiUtil = require('../../util/sessions_api_util');
var History = require('react-router').History;

var Account = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {user: CurrentUserStore.currentUser()};
  },

  componentDidMount: function () {
    this.signOutListener = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.signOutListener.remove();
  },

  _onChange: function () {
    if (!CurrentUserStore.isLoggedIn) {
      // this.history.pushState(null, 'home');
    }
  },

  handleSignOutClick: function (e) {
    SessionsApiUtil.logout();
  },

  render: function () {
    return (
      <div className="account-options-menu">
        <div className="account-options-menu-header">
          <img/>
          <div className="username">
            {this.state.user.username};
          </div>
          <div className="account-options-menu-links">
            <div className="settings link" onClick={this.handleSettingsClick}>Settings</div>
            <div className="sign-out-button link" onClick={this.handleSignOutClick}><i className="fa fa-sign-out fa-lg"></i> Log Out</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Account;
