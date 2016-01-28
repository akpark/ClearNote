var NoteConstants = require('../constants/noteConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var NoteActions = {
  receiveAllNotes: function(notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  },

  receiveSingleNote: function(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_RECEIVED,
      note: note
    });
  },

  createNote: function(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.CREATE_NOTE,
      note: note
    });
  },

  editNote: function(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.EDIT_NOTE,
      note: note
    });
  },

  deleteNote: function() {
    AppDispatcher.dispatch({
      actionType: NoteConstants.DELETE_NOTE,
      note: note
    });
  }
};

module.exports = NoteActions;
