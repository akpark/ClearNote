var UserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  fetchUsers: function () {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        UserActions.receiveUsers(users);
      }
    });
  },

  fetchUser: function (id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
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
      }
    });
  }

};

module.exports = UsersApiUtil;
