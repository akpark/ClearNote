var NoteStore = require('../stores/note');
var NoteActions = require('../actions/noteActions');

var ApiUtil = {
  fetchAllNotes: function() {
    $.ajax({
      method: "GET",
      url: "/api/notes",
      dataType: "json",
      success: function(notes) {
        debugger
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

  createNote: function() {
    $.ajax({
      method: "POST",
      url: "api/notes",
      data: {note: note},
      success: function (note) {
        NoteActions.createNote(note);
      }
    });
  },

  editNote: function(note, callback) {
    $.ajax({
      method: "PATCH",
      url: "api/notes/" + note.id,
      data: {note: note},
      success: function (note) {
        debugger
        NoteActions.editNote(note);
        callback();
      }
    });
  },

  destroyNote: function() {
    $.ajax({
      method: "DELETE",
      url: "",
    });
  }

};

module.exports = ApiUtil;
