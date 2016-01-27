var React = require('react');
var NoteStore = require('../../stores/note');
var ApiUtil = require('../../util/apiUtil');
var NoteActions = require('../../actions/noteActions');
var NoteIndexItem = require('./indexItem');

var NotesIndex = React.createClass({
  getInitialState: function() {
    return ({notes: NoteStore.all()});
  },

  componentDidMount: function() {
    NoteStore.addListener(this._onChange);
    ApiUtil.fetchAllNotes();
  },

  // componentWillUnmount: function() {
  //   NoteStore.removeListener(this._onChange);
  // },

  _onChange: function() {
    this.setState({notes: NoteStore.all()});
  },

  render: function() {
    var notes = this.state.notes.map(function(note, key) {
      return (
        <NoteIndexItem key={key} note={note}>{note.title}</NoteIndexItem>
      );
    });
    return(
      <div className="notes-index">
        {notes}
      </div>
    );
  }

});

module.exports = NotesIndex;
