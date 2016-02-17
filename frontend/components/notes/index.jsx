var React = require('react');
var NotesApiUtil = require('../../util/notes_api_util');
var NoteStore = require('../../stores/note_store');
var NoteIndexItem = require('./index_item');
var History = require('react-router').History;

var NotesIndex = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { notes: this.getNotes(this.props) };
  },

  componentWillMount: function () {
    this.notesListener = NoteStore.addListener(this._onChange);
    NotesApiUtil.fetchAllNotes();
  },

  _onChange: function () {
    debugger
    this.setState({ notes: this.getNotes(this.props) });
  },

  componentWillUnmount: function() {
    this.notesListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ notes: this.getNotes(newProps) });
  },

  getNotes: function (props) {
    switch (props.indexInfo.header) {
      case "notes":
        return NoteStore.all();
      case "notebooks":
        return NoteStore.findByNotebookId(props.indexInfo.id);
    }
  },

  render: function() {
    var first = true;
    var noteItems = this.state.notes.map(function (note, key) {
      var klass = "note-index-item";
      if (first) {
        klass += " selected";
      }
      first = false;

      return (
        <NoteIndexItem
          onClick={this.handleNoteItemClick}
          className={klass}
          key={key}
          note={note}>
        </NoteIndexItem>
      );
    });

    var notesLength = (this.state.notes) ? this.state.notes.length : 0;

    return(
      <div className="notes-index">
        <div className="notes-index-header">
          <div className="notes-index-header-bottom group">
            <div className="number-of-notes">{notesLength} Note(s)</div>
          </div>
        </div>

        <div className="note-index-items">
          {noteItems}
        </div>
      </div>
    );
  }
});

module.exports = NotesIndex;
