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
  return notes;
  // return _notes.slice(0);
};

NoteStore.find = function(id) {
  return _notes[id];
  // _notes.forEach(function (note) {
  //   if (note.id === id) {
  //     return note;
  //   }
  // });
};

NoteStore.findFirst = function () {
  return _notes[Object.keys(_notes)[0]];

  // return _notes[0];
};

NoteStore.findByNotebook = function (id) {
  var notebookNotes = [];
  this.all().forEach(function (note) {
    if (note.notebook_id === id) {
      notebookNotes.push(note);
    }
  });
  return notebookNotes;
};

var resetNotes = function(notes) {
  _notes = {};
  notes.forEach(function (note) {
    _notes[note.id] = note;
  })
  // _notes = notes.slice(0);
};

var resetNote = function(newNote) {
  _notes[newNote.id] = newNote;
  // _notes.forEach(function (note) {
  //   if (note.id === newNote.id) {
  //     var index = _notes.indexOf(note);
  //     _notes[index] = newNote;
  //     return;
  //   }
  // });
  // _notes.push(newNote);
  // _notes[newNote.id] = newNote;
};

var deleteNote = function(deleteNote) {
  delete _notes[deleteNote.id];
  // _notes.forEach(function (note) {
  //   if (deleteNote.id === note.id) {
  //     var index = _notes.indexOf(note);
  //     _notes.splice(index, 1);
  //   }
  // });
};

var addNote = function(note) {
  _notes.unshift(note);
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

window.NoteStore = NoteStore;
module.exports = NoteStore;
