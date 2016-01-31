var Store = require('flux/utils').Store;
var _notes = {};
var NoteConstants = require('../constants/note_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteStore = new Store(AppDispatcher);

NoteStore.all = function() {
  var notes = [];
  for (var id in _notes) {
    notes.push(_notes[id]);
  }
  return notes;
};

NoteStore.find = function(id) {
  return _notes[id];
};

NoteStore.findFirst = function() {
  return Object.key(_notes)[0];
};

var resetNotes = function(notes) {
  _notes = {};
  notes.forEach(function (note) {
    _notes[note.id] = note;
  });
};

var resetNote = function(newNote) {
  _notes[newNote.id] = newNote;
  debugger
};

var deleteNote = function(note) {
  _notes.forEach(function (note) {
    var idx = _notes.indexOf(note);
    if (idx > 0) {
      _notes.splice(idx, 1);
    }
  });
};

var addNote = function(note) {
  _notes.push(note);
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

    case NoteConstants.CREATE_NOTE:
      addNote(payload.note);
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

module.exports = NoteStore;
