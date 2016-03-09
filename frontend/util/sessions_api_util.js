var CurrentUserActions = require('../actions/current_user_actions');

var SessionsApiUtil = {

  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      },
      error: function (errors) {
        CurrentUserActions.receiveErrors(errors);
      }
    });
  },

  logout: function () {
    $.ajax({
      url: 'api/session',
      type: 'DELETE',
      dataType: "json",
      success: function (message) {
        CurrentUserActions.deleteCurrentUser();
      }.bind(this),
      error: function () {
        alert("error!");
      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }

};

module.exports = SessionsApiUtil;
