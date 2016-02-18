var React = require('react');
var TextEditor = require('./text_editor');
var History = require('react-router').History;
var NoteStore = require('../../stores/note_store');
var NotesApiUtil = require('../../util/notes_api_util');

var _expanded = false;

var NoteForm = React.createClass({
  getInitialState: function () {
    return { noteId: this.props.params.noteId };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState( {noteId: newProps.params.noteId });
  },

  handleExpand: function () {
		if (!_expanded) {
			$('.notes-index').hide("slow");
	    $('.navbar').hide("slow");
			$('.note-form-outer').addClass("expanded");
			_expanded = true;
		} else {
			$('.notes-index').show("slow");
			$('.navbar').show("slow");
			$('.note-form-outer').removeClass("expanded");
			_expanded = false;
		}
	},

  handleCancelClick: function () {
    $('.notes-index').show("slow");
    $('.navbar').show("slow");
    $('.note-form-outer').removeClass("expanded");
  },

  setUpHeader: function () {
    return (<div className="note-form-header">
             <div className="expand-button" onClick={this.handleExpand}><i className="fa fa-expand"></i></div>
           </div>);
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
