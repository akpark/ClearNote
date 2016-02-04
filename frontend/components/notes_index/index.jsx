var React = require('react');
var NoteStore = require('../../stores/note_store');
var NotesApiUtil = require('../../util/notes_api_util');
var NoteActions = require('../../actions/note_actions');
var NoteIndexItem = require('./index_item');
var OptionsDropdown = require('./options_dropdown');
var History = require('react-router').History;

var NotesIndex = React.createClass({
  mixins: [History],

  getInitialState: function() {
    console.log("get Initial State");
    return ({notes: NoteStore.all(), indexInfo: this.props.indexInfo});
  },

  componentWillMount: function () {
    console.log("componentWillMount");
    this.notesListener = NoteStore.addListener(this._onChange);
    NotesApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    this.notesListener.remove();
  },

  //edit content
  _onChange: function() {
    console.log("on change");
    var notes;
    switch (this.state.indexInfo.header) {
      case "notes":
        notes = NoteStore.all();
        break;
      case "notebooks":
        notes = NoteStore.findByNotebook(indexInfo.id);
        break;
      case "tags":
        // notes
        break;
    }
    this.setState({notes: notes})
  },

  //load page
  componentWillReceiveProps: function (newProps) {
    var notes;
    switch (newProps.indexInfo.header) {
      case "notebooks":
        notes = NoteStore.findByNotebook(parseInt(newProps.indexInfo.id));
        break;
      case "tags":
        //find notes by tag
        break;
      case "shortcuts":
        //find notes by shortcuts
        break;
    }
    this.setState({notes: notes, title: newProps.indexInfo.title})
  },

  fetchNotes: function () {
    console.log("fetch notes");
    debugger
    var notes = this.state.notes.map(function (note, key) {
        return ( <NoteIndexItem key={key} note={note} /> );
    });
    return notes;
  },

  render: function() {
    console.log("render");
    var notes = this.fetchNotes();

    var optionsDropdown;
    if (this.state.optionsClicked) { optionsDropdown = <OptionsDropdown />; }

    return(
      <div className="notes-index">

        <div className="notes-index-header">
          <div className="notes-index-title">{this.state.title}</div>
          <div className="notes-index-header-bottom group">
            <div className="number-of-notes">{notes.length} Notes</div>
            <div onClick={this.showOptions} className="options-dropdown-click">Options &#8964;
              {optionsDropdown}
            </div>
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
