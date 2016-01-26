var AppDispatcher = require('../dispatcher/dispatcher');
var NoteConstants = require('../constants/noteConstants');

var ApiActions = {
  receiveAllNotes: function(notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  },
};

module.exports = ApiActions;
