var NoteStore = require('../stores/note_store');
var NoteActions = require('../actions/note_actions');

var NotesApiUtil = {
  fetchAllNotes: function () {
    $.ajax({
      method: "GET",
      url: "/api/notes",
      dataType: "json",
      success: function(notes) {
        NoteActions.receiveAllNotes(notes);
      }
    });
  },

  fetchSingleNote: function (id) {
    $.ajax({
      method: "GET",
      url: "api/notes/" + id,
      dataType: "json",
      success: function(note) {
        console.log("Successfuly retrieved note!");
        NoteActions.receiveSingleNote(note);
      }
    });
  },

  createNote: function (note, callback) {
    $.ajax({
      method: "POST",
      url: "api/notes",
      data: {note: note},
      dataType: "json",
      success: function (note) {
        console.log("note created!");
        NoteActions.createNote(note);
        callback(note);
      }
    });
  },

  editNote: function (note) {
    $.ajax({
      method: "PATCH",
      url: "api/notes/" + note.id,
      data: {note: note},
      success: function (note) {
        NoteActions.editNote(note);
      }
    });
  },

  deleteNote: function (noteId) {
    $.ajax({
      method: "DELETE",
      url: "api/notes/" + noteId,
      success: function (note) {
        NoteActions.deleteNote(note);
      }
    });
  }

};

module.exports = NotesApiUtil;
