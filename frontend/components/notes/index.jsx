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
    this.notesListener = NoteStore.addListener(this._onChange);
    ApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    this.notesListener.remove();
  },

  _onChange: function() {
    this.setState({notes: NoteStore.all()});
  },

  render: function() {
    var notes = this.state.notes.map(function(note, key) {
      return (
        <NoteIndexItem children={this.props.children} key={key} note={note}>{note.title}</NoteIndexItem>
      );
    }.bind(this));

    return(
      <div className="notes-index">

        <div className="notes-index-header">
          <h1 className="notes-index-title">Notes</h1>
          <div className="notes-index-header-bottom group">
            <h3 className="number-of-notes">567 Notes</h3>
            <select className="options-dropdown">
              <h2>Sort By</h2>
              <option value="">Date Created</option>
            </select>
          </div>
        </div>

        <div className="note-index-items">
          {notes}
        </div>

      </div>
    );
  }

});

module.exports = NotesIndex;
