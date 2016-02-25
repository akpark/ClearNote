var React = require('react');
var NotesApiUtil = require('../../util/notes_api_util');
var NotebooksApiUtil = require('../../util/notebooks_api_util');
var NoteStore = require('../../stores/note_store');
var NotebookStore = require('../../stores/notebook_store');
var NoteIndexItem = require('./index_item');
var History = require('react-router').History;

var type = "notes";
var title = "notes";

var NotesIndex = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { notes: this.getNotes(this.props) };
  },

  componentWillMount: function () {
    this.notesListener = NoteStore.addListener(this._onChange);
    NotesApiUtil.fetchAllNotes();
    NotebooksApiUtil.fetchAllNotebooks();
  },

  _onChange: function () {
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
        type = "notes";
        title = "notes";
        return NoteStore.all();
      case "notebooks":
        type = "notebooks";
        title = NotebookStore.find(props.indexInfo.id).title;
        return NoteStore.findByNotebookId(props.indexInfo.id);
    }
  },

  render: function() {
    var first = 0;
    var selected = false;
    var noteItems = this.state.notes.map(function (note, key) {
      if (first === 0) {
        selected = true;
      } else {
        selected = false;
      }
      first += 1;

      return (
        <NoteIndexItem
          onClick={this.handleNoteItemClick}
          key={key}
          note={note}
          type={type}
          notebookId={this.props.indexInfo.id}
          selected={selected}>
        </NoteIndexItem>
      );
    }.bind(this));

    var notesLength = (this.state.notes) ? this.state.notes.length : 0;

    return(
      <div className="notes-index">
        <div className="notes-index-header">
          <div className="notes-index-title">{title}</div>
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
