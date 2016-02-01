var Store = require('flux/utils').Store;
var _notes = [];
var NoteConstants = require('../constants/note_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var NoteStore = new Store(AppDispatcher);
var History = require('react-router').History;

NoteStore.all = function() {
  return _notes.slice(0);
  // var notes = [];
  // for (var id in _notes) {
  //   notes.push(_notes[id]);
  // }
  // return notes;
};

NoteStore.find = function(id) {
  _notes.forEach(function (note) {
    if (note.id === id) {
      return note;
    }
  });
  // return _notes[id];
};

NoteStore.findFirst = function() {
  return _notes[0];
  // return Object.keys(_notes)[0];
};

var resetNotes = function(notes) {
  _notes = notes.slice(0);
  // _notes = {};
  // notes.forEach(function (note) {
  //   _notes[note.id] = note;
  // });
};

var resetNote = function(newNote) {
  _notes.forEach(function (note) {
    debugger
    if (note.id === newNote.id) {
      var index = _notes.indexOf(note);
      _notes[index] = newNote;
      // note = newNote;
      return;
    }
  });
  _notes.push(newNote);
  // _notes[newNote.id] = newNote;
};

var deleteNote = function(deleteNote) {
  _notes.forEach(function (note) {
    if (deleteNote.id === note.id) {
      var index = _notes.indexOf(note);
      _notes.splice(index, 1);
    }
  });
  // var index = _notes.indexOf(note);
  // debugger
  // if (index > -1) {
  //   _notes.splice(index, 1);
  // }
  // delete _notes[note.id];
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
