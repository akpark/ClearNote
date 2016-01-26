var NoteConstants = require('../constants/NoteConstants');

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

  createNote: function() {
    AppDispatcher.dispatch({

    });
  }
};

module.exports = NoteActions;
