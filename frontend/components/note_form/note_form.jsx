var React = require('react');
var TextEditor = require('./text_editor');
var NotesApiUtil = require('../../util/notes_api_util');
var ReactQuill = require('react-quill');

var NoteForm = React.createClass({

  getInitialState: function() {
    var note;
    var id = this.props.params.noteId;
    if (id === "new") {
      note = {};
    } else {
      note = NoteStore.find(parseInt(this.props.params.noteId));
    }
    return { note: note }
  },

  componentDidMount: function() {
    this.noteListener = NoteStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function(newProps) {
    var id = newProps.params.noteId
    if (id === "new") {
      this.setState({note: {}});
    } else {
      NotesApiUtil.fetchSingleNote(parseInt(newProps.params.noteId));
    }
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
  },

  _onChange: function() {
    var id = this.props.params.noteId;
    var note;
    if (id === "new") {
      note = {};
    } else {
      note = NoteStore.find(parseInt(this.props.params.noteId));
    }
    this.setState({note: note});
  },

  handleNewNoteDoneClick: function(e) {
    NotesApiUtil.createNote();
  },

  onTextChange: function() {

  },

  setUpHeader: function () {
    if (!this.state.note.id) {
      return (
        <div onClick={this.handleNewNoteDoneClick} className="done-button">Done</div>
      )
    } else {
      return (<div>
        <div onClick={this.handleExpand}>Expand</div>
      </div>);
    }
  },

  render: function() {
    var header = this.setUpHeader();

    return (
      <div className="note-form-outer">
          <div className="note-form-header">
            {header}
          </div>
          <ReactQuill
            theme="snow"
            value={this.state.note.body}
            onChange={this.onTextChange} />
      </div>
    );
  }
});

module.exports = NoteForm;
