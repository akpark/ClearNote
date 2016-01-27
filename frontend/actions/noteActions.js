var NoteConstants = require('../constants/noteConstants');
var AppDispatcher = require('../dispatcher/dispatcher')

var NoteActions = {
  fetchAllNotes: function(notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  },

  fetchSingleNote: function(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_RECEIVED,
      note: note
    });
  },
};

module.exports = NoteActions;
