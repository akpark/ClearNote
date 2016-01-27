var NoteStore = require('../stores/note');
var NoteActions = require('../actions/NoteActions');

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
    })
  },

  createNote: function() {

  }
};

module.exports = ApiUtil;
