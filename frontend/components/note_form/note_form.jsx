var React = require('react');
var TextEditor = require('./text_editor');
var NotesApiUtil = require('../../util/notes_api_util');
var ReactQuill = require('react-quill');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var quillEditor;
var edit;

var NoteForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function() {
    var note = this.props.location.query;
    if (this.props.params.noteId === "new") {
      note = {title: "", body: ""};
      edit = false;
    } else {
      note = this.props.location.query;
      edit = true;
    }
    return { title: note.title, body: note.body }
  },

  componentDidMount: function() {
    this.noteListener = NoteStore.addListener(this._onChange);
    this.setUpEditor();
  },

  //when we change index item
  componentWillReceiveProps: function(newProps) {
    var id = newProps.params.noteId
    if (id === "new") {
      var note = {title: "", body: ""}
      this.setState({title: note.title, body: note.body});
      edit = false;
    } else {
      var note = newProps.location.query;
      this.setState({title: note.title, body: note.body});
      edit = true;
    }
  },

  componentWillMount: function () {
    var note = this.props.location.query;
    this.setState({title: note.title, body: note.body});
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
  },

  handleNewNoteDoneClick: function(e) {
    this.showHome();
    var title = this.state.title;
    var body = quillEditor.getText();
    var note = {title: title, body: body};
    debugger
    NotesApiUtil.createNote(note);
  },

  onTextChange: function(e) {
    var title = e.target.value;
    this.setState({title: title});
    if (edit) {

    } else {

    }
  },

  // handleTextChange: function(text) {
  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //   }
  //
  //   this.timer = setTimeout(function() {
  //     var note = this.props.note;
  //     note.body = this.state.body;
  //     ApiUtil.editNote(note, function() {
  //       console.log("Successfully edited!");
  //     });
  //   }.bind(this), 3000);
  //
  //   this.setState({body: e.target.value});
  // },

  showHome: function () {
    $('.notes-index').show("slow");
    $('.navbar').show("slow");
  },

  setUpHeader: function () {
    if (edit) {
      return (<div>
        <div onClick={this.handleExpand}>Expand</div>
      </div>);
    } else {
      return (
        <div>
          <div onClick={this.handleCancelClick}>Cancel</div>
          <div onClick={this.handleNewNoteDoneClick} className="done-button">Done</div>
        </div>
      )
    }
  },

  handleCancelClick: function () {
    this.showHome();
    // this.history.pushState(null, "/");
  },

  setUpToolbar: function () {
    return (
      <div id="toolbar" className="ql-toolbar-container toolbar">
        <div className="ql-format-group">
          <span className="ql-bold ql-format-button"></span>
          <span className="ql-italic ql-format-button"></span>
          <span className="ql-strike ql-format-button"></span>
          <span className="ql-underline ql-format-button"></span>
          <span className="ql-link ql-format-button"></span>
          <span className="ql-format-separator"></span>
        </div>
      </div>
    );
  },

  setUpBody: function () {

  },

  setUpEditor: function () {
    quillEditor = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' },
        'link-tooltip': true
      },
      theme: 'snow'
    });
    quillEditor.setText(this.state.body);
    quillEditor.on('text-change', function(delta, source) {
      console.log("Editor contents have changed");
    });
  },

  render: function() {
    var header = this.setUpHeader();
    var toolbar = this.setUpToolbar();
    if (quillEditor) {
      quillEditor.setText(this.state.body);
    }

    var placeholderText = "";
    if (!edit) {
      placeholderText = "Title your note";
    }

    return (
      <div className="note-form-outer">
          <div className="note-form-header">
            {header}
          </div>
          <div className="editor-outer">
            {toolbar}
            <input
              className="note-form-title"
              type="text"
              valueLink={this.linkState('title')}
              onChange={this.handleTitleChange}
              placeholder={placeholderText}>
            </input>
            <div id="editor"></div>
          </div>
      </div>
    );
  }
});




// _onChange: function() {
//   var id = this.props.params.noteId;
//   var note;
//   if (id === "new") {
//     note = {};
//   } else {
//     note = NoteStore.find(parseInt(this.props.params.noteId));
//   }
//   this.setState({note: note});
// },

module.exports = NoteForm;
