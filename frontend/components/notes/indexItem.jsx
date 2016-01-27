var React = require('react');
var NoteStore = require('../../stores/note');

var NoteIndexItem = React.createClass({
  getInitialState: function() {
    return {note: this.props.note};
  },

  render: function() {
    var note = this.state.note;
    return (
      <div className="note-index-item">
        <div>{note.title}</div>
        <div>{note.description}</div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
