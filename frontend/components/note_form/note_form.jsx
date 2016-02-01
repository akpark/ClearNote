var React = require('react');
var TextEditor = require('./text_editor');
var NotesApiUtil = require('../../util/notes_api_util');
var ReactQuill = require('react-quill');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;
var NoteStore = require('../../stores/note_store');
var NotebookStore = require('../../stores/notebook_store');
var NotebooksApiUtil = require('../../util/notebooks_api_util');

var quillEditor;
var edit;
var sameEditor = false;

var NoteForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function() {
    return this.setUpNote(this.props.params.noteId, this.props.location.query);
  },

  componentDidMount: function() {
    this.setUpQuillEditor();
    console.log("componentdidmount");
  },

  setUpNote: function(id, noteProps) {
    var note;
    if (id === "new") {
      note = {id: null, title: "", body: ""};
      edit = false;
    } else {
      note = noteProps;
      edit = true;
    }
    return { id: note.id, title: note.title, body: note.body }
  },

  //when we change index item
  componentWillReceiveProps: function(newProps) {
    var id = newProps.params.noteId;
    var note = this.setUpNote(id, newProps.location.query);
    this.setState({id: note.id, title: note.title, body: note.body});
  },

  componentWillMount: function () {
    var note = this.props.location.query;
    this.setState({title: note.title, body: note.body});
    NotebooksApiUtil.fetchAllNotebooks();
    console.log("componentwillmount");
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
  },

  handleNewNoteDoneClick: function(e) {
    this.showHome();
    var title = this.state.title;
    var body = quillEditor.getText();
    var notebook_id = $('.notebook-selection-dropdown option:selected').val();
    var note = {title: title, body: body, notebook_id: parseInt(notebook_id)};
    NotesApiUtil.createNote(note);
  },

  handleTextChange: function() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      body = quillEditor.getText();
      var note = { id: this.state.id, title: this.state.title, body: body }
      NotesApiUtil.editNote(note, function () {
        //some animation
        console.log("Successfully edited!");
        this.setState({body: note.body});
      }.bind(this));
    }.bind(this), 3000);
  },

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
          <div onClick={this.handleNewNoteDoneClick} className="new-note-done-button">Done</div>
        </div>
      )
    }
  },

  handleCancelClick: function () {
    this.showHome();
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

  setUpQuillEditor: function () {
    quillEditor = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' },
        'link-tooltip': true
      },
      theme: 'snow'
    });
    quillEditor.setText(this.state.body);
    quillEditor.on('text-change', function (delta, source) {
      if (edit && !sameEditor) {
        console.log("handle text change");
        this.handleTextChange();
      }
      console.log("Editor contents have changed");
    }.bind(this));
  },

  render: function() {
    var header = this.setUpHeader();
    var toolbar = this.setUpToolbar();
    var notebooks = NotebookStore.all().map(function (notebook, key) {
      return <option key={key} value={notebook.id}>{notebook.title}</option>;
    });

    var placeholderText = "";
    if (!edit) {
      placeholderText = "Title your note";
    }
    console.log("render");
    if (quillEditor) {
      console.log("inside quilleditor");
      sameEditor = true;
      quillEditor.setText(this.state.body);
      sameEditor = false;
    }

    return (
      <div className="note-form-outer">
        <div className="note-form-header">
          {header}
        </div>
        <div className="editor-outer">
          <label htmlFor="notebook-selection-dropdown">Notebook </label>
          <select className="notebook-selection-dropdown">
            {notebooks}
          </select>
          {toolbar}
          <input
            className="note-form-title"
            type="text"
            onKeyUp={this.handleTextChange}
            valueLink={this.linkState('title')}
            placeholder={placeholderText}>
          </input>
          <div id="editor"></div>
        </div>
      </div>
    );
  }
});

module.exports = NoteForm;
