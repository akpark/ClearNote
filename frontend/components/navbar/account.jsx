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

  handleSignOutClick: function () {
    SessionsApiUtil.logout();
    this.history.pushState(null, '/');
  },

  render: function () {
    return (
      <div className="account-options-menu">
        <div className="account-options-menu-header">
          <div className="username">
            {this.state.user.username}
          </div>
        </div>
          <div className="account-options-menu-links">
            <div className="settings-link"
                 onClick={this.handleSettingsClick}>Settings</div>
            <div className="sign-out-link"
                 onClick={this.handleSignOutClick}>
                 <i className="fa fa-sign-out fa-lg"></i> Log Out</div>
          </div>
      </div>
    );
  }
});

module.exports = Account;
