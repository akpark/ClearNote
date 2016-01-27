var NoteStore = require('../stores/note');
var NoteActions = require('../actions/noteActions');

var ApiUtil = {
  fetchAllNotes: function() {
    $.ajax({
      method: "GET",
      url: "/api/notes",
      dataType: "json",
      success: function(notes) {
        NoteActions.fetchAllNotes(notes);
      }
    });
  },

  fetchSingleNote: function() {
    $.ajax({
      method: "GET",
      url: "",
      dataType: "json",
      success: function(note) {
        ApiActions.receiveSingleNote(note);
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

  editNote: function() {
    $.ajax({
      method: "PATCH",
      url: ""
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
