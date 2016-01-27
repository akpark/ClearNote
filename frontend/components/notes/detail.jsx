var React = require('react');
var NoteStore = require('../../stores/note');
var ApiUtil = require('../../util/apiUtil');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var typingTimer;
var doneTypingInterval = 3000;

var NoteDetail = React.createClass({
  mixins: [LinkedStateMixin],

  getStateFromStore: function() {
    var note = NoteStore.find(parseInt(this.props.params.noteId));
    note = note || {id: 0, title: "", body: ""};
    return { id: note.id, title: note.title, body: note.body };
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillReceiveProps: function(newProps) {
    //with these new props, we fetch the new note
    ApiUtil.fetchSingleNote(parseInt(newProps.params.noteId));
  },

  componentDidMount: function() {
    this.noteListener = NoteStore.addListener(this._onChange);
    ApiUtil.fetchSingleNote(parseInt(this.props.params.noteId));
  },

  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },

  handleBodyChange: function(e) {
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function() {
      var note = {id: this.state.id, title: this.state.title, body: this.state.body};
      ApiUtil.editNote(note, function() {
        console.log("Successfully edited!");
      });
    }.bind(this), 3000);

    this.setState({body: e.target.value});
  },

  render: function() {
    //a form for that particular note
    //automatically update the note when input
    return (
      <form className="note-detail-form">
        <div>
          <label htmlFor="note-title"></label>
          <input
            onChange={this.handleTitleChange}
            type="text"
            id="note-title"
            value={this.state.title}
          />
        </div>

        <div>
          <label htmlFor="note-body"></label>
          <textarea
            onChange={this.handleBodyChange}
            id="note-body"
            value={this.state.body}
          />
        </div>
      </form>
    );
  }
});

module.exports = NoteDetail;
