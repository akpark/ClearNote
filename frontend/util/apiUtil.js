var NoteStore = require('../stores/note');
var ApiActions = require('../actions/apiActions');

var ApiUtil = {
  fetchAllNotes: function() {
    $.get('api/notes', null, function(notes){
      ApiActions.receiveAllNotes(notes);
    });
  },

  fetchSingleNote: function() {

  },

  createNote: function() {
    
  }
};

module.exports = ApiUtil;
