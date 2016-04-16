var React = require('react');
var TextEditor = require('./text_editor');
var History = require('react-router').History;
var NoteStore = require('../../stores/note_store');
var NotesApiUtil = require('../../util/notes_api_util');

var NoteForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { noteId: this.props.params.noteId };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState( { noteId: newProps.params.noteId });
  },

  handleExpand: function () {
		if ($(".expanded").length === 0) {
      $('.notes-index').hide("slow");
      $('.navbar').hide("slow");
      $('.note-form-outer').addClass("expanded");
		} else {
      $('.notes-index').show("slow");
      $('.navbar').show("slow");
      $('.note-form-outer').removeClass("expanded");
		}
	},

  handleCancelClick: function () {
    this.handleExpand();
    this.history.pushState(null, 'home');
  },

  setUpHeader: function () {
    if (this.props.params.noteId === "new") {
      return (
        <div className="note-form-header group">
          <div className="done-button" onClick={this.handleExpand}>DONE</div>
          <div className="cancel-button" onClick={this.handleCancelClick}>CANCEL</div>
        </div>
      )
    } else {
      return (<div className="note-form-header">
               <div className="expand-button" onClick={this.handleExpand}><i className="fa fa-expand"></i></div>
             </div>);
   }
  },

  render: function () {
    var header = this.setUpHeader();
    var textEditor = <TextEditor noteId={this.state.noteId} />

    return (
      <div className="note-form-outer">
        {header}
        {textEditor}
      </div>
    )
  }
})

module.exports = NoteForm;
