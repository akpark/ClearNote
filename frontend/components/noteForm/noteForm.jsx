var React = require('react');
var MiniMenu = require('../miniMenu');
var TextEditor = require('./textEditor');
var ApiUtil = require('../../util/apiUtil');

var NoteForm = React.createClass({
  getStateFromStore: function() {
    var note = NoteStore.find(parseInt(this.props.params.noteId));
    note = note || {id: 0, title: "", body: ""};
    return {note: note};
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  componentDidMount: function() {
    this.noteListener = NoteStore.addListener(this._onChange);

  },

  componentWillReceiveProps: function(newProps) {
    debugger
    ApiUtil.fetchSingleNote(parseInt(newProps.params.noteId));
  },

  _onChange: function() {
    debugger
    this.setState(this.getStateFromStore());
  },

  render: function() {
    debugger
    return (
      <div className="note-form-outer">
        <div className="note-form-header">
          <MiniMenu />
          <div>Share</div>
          <div>Done</div>
        </div>
        <TextEditor note={this.state.note} />
      </div>
    );
  }
});

module.exports = NoteForm;
