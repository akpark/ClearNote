var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CurrentUserConstants = require('../constants/current_user_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;
var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  debugger
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      _currentUserHasBeenFetched = true;
      _currentUser = payload.currentUser;
      this.__emitChange();
      break;

    case CurrentUserConstants.DELETE_USER:
      _currentUser = {};
      _currentUserHasBeenFetched = false;
      this.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
window.CurrentUserStore = CurrentUserStore;
