var Store = require('flux/utils').Store;
var NoteConstants = require('../constants/note_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteStore = new Store(AppDispatcher);
var History = require('react-router').History;
var _notes = {};

NoteStore.all = function() {
  var notes = [];
  for (var id in _notes) {
    notes.push(_notes[id]);
  }
  return notes.reverse();
};

NoteStore.find = function(id) {
  return _notes[id];
};

NoteStore.findByNotebookId = function (id) {
  var notebookNotes = [];
  this.all().forEach(function (note) {
    if (note.notebook_id === id) {
      notebookNotes.push(note);
    }
  });
  return notebookNotes;
};

NoteStore.findByTagId = function (id) {

};

NoteStore.findByShortcut = function (id) {

};

var resetNotes = function(notes) {
  _notes = {};
  notes.forEach(function (note) {
    _notes[note.id] = note;
  });
};

var resetNote = function(newNote) {
  _notes[newNote.id] = newNote;
};

var deleteNote = function(deleteNote) {
  delete _notes[deleteNote.id];
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

module.exports = NoteStore;
