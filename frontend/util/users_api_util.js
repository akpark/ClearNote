var CurrentUserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  fetchUsers: function () {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        CurrentUserActions.receiveUsers(users);
      }
    });
  },

  fetchUser: function (id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        CurrentUserActions.receiveUser(user);
      }
    });
  },

  createUser: function (user, cb) {
    $.ajax({
      url: 'api/users',
      type: 'POST',
      data: user,
      dataType: 'json',
      success: function (data) {
        cb && cb(data);
      },
      error: function (errors) {
        CurrentUserActions.receiveErrors(errors);
      }
    });
  }

};

module.exports = UsersApiUtil;
