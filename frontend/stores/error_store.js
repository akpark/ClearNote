var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorStore = new Store(AppDispatcher);
var ErrorConstants = require('../constants/error_constants');

var errors = [];

ErrorStore.all = function () {
  return errors.slice(0);
};

var resetErrors = function (newErrors) {
  errors = newErrors.responseJSON;
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.ERRORS_RECEIVED:
      resetErrors(payload.errors);
      this.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
window.ErrorStore = ErrorStore;
