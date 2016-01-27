var React = require('react');
var NoteStore = require('../../stores/note');
var ApiUtil = require('../../util/apiUtil');
var NoteActions = require('../../actions/noteActions')

var NotesIndex = React.createClass({
  getInitialState: function() {
    return ({notes: NoteStore.all()});
  },

  componentDidMount: function() {
    NoteStore.addListener(this._onChange);
    ApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    NoteStore.remove(this._onChange);
  },

  _onChange: function() {
    this.setState({notes: NoteStore.all()});
  },

  render: function() {
    var notes = this.state.notes.map(function(note, key) {
      return (
        <li key={key} note={note}>{note.title}</li>
      );
    });
    return(
      <ul>
        {notes}
      </ul>
    );
  }
});

module.exports = NotesIndex;
