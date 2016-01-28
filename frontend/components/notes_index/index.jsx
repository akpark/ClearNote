var React = require('react');
var NoteStore = require('../../stores/note');
var ApiUtil = require('../../util/apiUtil');
var NoteActions = require('../../actions/noteActions');
var NoteIndexItem = require('./indexItem');
var OptionsDropdown = require('./optionsDropdown');

var NotesIndex = React.createClass({
  getInitialState: function() {
    return ({notes: NoteStore.all(), optionsClicked: false});
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

  showOptions: function() {
    if (this.state.optionsClicked) {
      this.setState({optionsClicked: false});
    } else {
      this.setState({optionsClicked: true});
    }
  },

  render: function() {
    var notes = this.state.notes.map(function(note, key) {
      return (
        <NoteIndexItem key={key} note={note}>{note.title}</NoteIndexItem>
      );
    }.bind(this));

    var optionsDropdown;
    if (this.state.optionsClicked) {
      optionsDropdown = <OptionsDropdown />;
    }

    return(
      <div className="notes-index">

        <div className="notes-index-header">
          <div className="notes-index-title">NOTES</div>
          <div className="notes-index-header-bottom group">
            <div className="number-of-notes">567 Notes</div>
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

$(document).on("click", function() {
  
});
module.exports = NotesIndex;
