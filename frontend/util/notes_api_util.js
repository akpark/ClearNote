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
        NoteActions.createNote(note);
        callback && callback(note);
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

  deleteNote: function (noteId, callback) {
    $.ajax({
      method: "DELETE",
      url: "api/notes/" + noteId,
      success: function (note) {
        callback();
        NoteActions.deleteNote(note);
      }
    });
  }

};

module.exports = NotesApiUtil;
