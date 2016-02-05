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
    return ({notes: NoteStore.all(), indexInfo: this.props.indexInfo});
  },

  componentWillMount: function () {
    this.notesListener = NoteStore.addListener(this._onChange);
    NotesApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    this.notesListener.remove();
  },

  _onChange: function() {
    console.log(this.props.indexInfo.header);
    debugger
    switch (this.props.indexInfo.header) {
      case "notes":
        this.setState({notes: NoteStore.all()});
        break;
      case "notebooks":
        this.setState({notes: NoteStore.findByNotebookId(parseInt(this.props.indexInfo.id))});
        break;
    }
    // this.setState({notes: NoteStore.all()});
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.indexInfo.header === "notebooks") {
      this.setState({notes: NoteStore.findByNotebookId(parseInt(newProps.indexInfo.id))});
    } else {
      this.setState({notes: NoteStore.all()});
    }
  },
  //
  // getNotes: function () {
  //   var notes;
  //   switch (this.props.indexInfo.header) {
  //     case "notes":
  //       notes = NoteStore.all();
  //       break;
  //     case "notebooks":
  //       notes = NoteStore.findByNotebookId(this.props.indexInfo.id);
  //       break;
  //   }
  //   return notes;
  // },

  // getNotesIndexItems: function () {
  //   var notes = this.getNotes();
  //   var noteItems = this.state.notes.map(function (note, key) {
  //     return (<NoteIndexItem key={key} note={note} />);
  //   });
  //   return noteItems;
  // },
  //
  // getNotesIndexItems: function () {
  //   console.log("getNotesIndexItems");
  //   debugger
  //   var notes = [];
  //   switch (this.props.indexInfo.header) {
  //     case "notes":
  //       notes = NoteStore.all();
  //       break;
  //     case "notebooks":
  //       notes = NoteStore.findByNotebookId(this.props.indexInfo.id);
  //       break;
  //   }
  //   return notes;
  // },

  render: function() {
    console.log("render notes index");

    var noteItems = this.state.notes.map(function (note, key) {
      return (<NoteIndexItem key={key} note={note} />);
    });

    var notesLength = (this.state.notes) ? this.state.notes.length : 0;

    var optionsDropdown;
    if (this.state.optionsClicked) { optionsDropdown = <OptionsDropdown />; }

    return(
      <div className="notes-index">

        <div className="notes-index-header">
          <div className="notes-index-title">{this.props.indexInfo.title}</div>
          <div className="notes-index-header-bottom group">
            <div className="number-of-notes">{notesLength} Notes</div>
            <div onClick={this.showOptions} className="options-dropdown-click">Options &#8964;
              {optionsDropdown}
            </div>
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
