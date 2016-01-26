var Store = require('flux/utils').Store;
var _notes = [];
var NoteConstants = require('../constants/noteConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteStore = new Store(AppDispatcher);

NoteStore.all = function() {
  return _notes.slice(0);
};

var resetNotes = function(notes) {
  _notes = notes.slice(0);
};

NoteStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NoteConstants.NOTES_RECEIVED:
      resetNotes(payload.notes);
      this.__emitChange();
      break;
  }
};

module.exports = NoteStore;
