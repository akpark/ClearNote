var NoteStore = require('../stores/note_store');
var NoteActions = require('../actions/note_actions');

var ApiUtil = {
  fetchAllNotes: function() {
    $.ajax({
      method: "GET",
      url: "/api/notes",
      dataType: "json",
      success: function(notes) {
        NoteActions.receiveAllNotes(notes);
      }
    });
  },

  fetchSingleNote: function(id) {
    $.ajax({
      method: "GET",
      url: "api/notes/" + id,
      dataType: "json",
      success: function(note) {
        NoteActions.receiveSingleNote(note);
      }
    });
  },

  createNote: function(note) {
    $.ajax({
      method: "POST",
      url: "api/notes",
      data: {note: note},
      dataType: "json",
      success: function (note) {
        NoteActions.receiveSingleNote(note);
      }
    });
  },

  editNote: function(note, callback) {
    $.ajax({
      method: "PATCH",
      url: "api/notes/" + note.id,
      data: {note: note},
      success: function (note) {
        NoteActions.editNote(note);
        callback();
      }
    });
  },

};

module.exports = ApiUtil;
