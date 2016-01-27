var Store = require('flux/utils').Store;
var _notes = [];
var NoteConstants = require('../constants/noteConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteStore = new Store(AppDispatcher);

NoteStore.all = function() {
  return _notes.slice(0);
};

NoteStore.find = function(id) {
  return _notes.find(function(note) {
    return note.id == id;
  });
};

var resetNotes = function(notes) {
  _notes = notes.slice(0);
};

var resetNote = function(newNote) {
  _notes.forEach(function(note) {
    if (note.id == newNote.id) {
      note = newNote;
    }
  });
};

var deleteNote = function(note) {
  _notes.forEach(function (note) {
    var idx = _notes.indexOf(note);
    if (idx > 0) {
      _notes.splice(idx, 1);
    }
  });
};

NoteStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NoteConstants.NOTES_RECEIVED:
      resetNotes(payload.notes);
      this.__emitChange();
      break;

    case NoteConstants.NOTE_RECEIVED:
      resetNote(payload.note);
      this.__emitChange();
      break;

    case NoteConstants.EDIT_NOTE:
      resetNote(payload.note);
      this.__emitChange();
      break;

    case NoteConstants.DELETE_NOTE:
      deleteNote(payload.note);
      this.__emitChange();
      break;
  }
};

window.NoteStore = NoteStore;
module.exports = NoteStore;
