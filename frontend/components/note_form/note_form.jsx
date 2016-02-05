var React = require('react');
var TextEditor = require('./text_editor');
var NotesApiUtil = require('../../util/notes_api_util');
var ReactQuill = require('react-quill');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;
var NoteStore = require('../../stores/note_store');
var NotebookStore = require('../../stores/notebook_store');
var NotebooksApiUtil = require('../../util/notebooks_api_util');
var QuillToolbar = require('./toolbar');
var MiniMenu = require('../mini_menu');

var _quillEditor;
var edit;
var sameEditor = false;
var _expanded = false;

const defaultColors = [
	'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
	'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
	'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
	'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
	'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
	'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
	'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
	'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
	'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
	'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
	'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
	'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
];

var NoteForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function() {
    debugger
    edit = (this.props.params.noteId === "new") ? false : true;
    var note = NoteStore.find(parseInt(this.props.params.noteId));
    return ({id: note.id, title: note.title, body: note.body});
  },

  componentDidMount: function() {
    this.noteformListener = NoteStore.addListener(this._onChange);
    // this.notebookListener = NoteBookStore.addListener(this._onChange);
    this.setUpQuillEditor();
  },

  componentWillMount: function () {
    NotesApiUtil.fetchAllNotes();
    NotebooksApiUtil.fetchAllNotebooks();
  },

  componentWillUnmount: function () {
    this.noteformListener.remove();
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.params.noteId === "new") {
      edit = false;
      debugger
      this.setState({title: "", body: ""});
      return;
    }
    var note = NoteStore.find(parseInt(newProps.params.noteId));
    this.setState({id: note.id, title: note.title, body: note.body});
  },

  handleNewNoteDoneClick: function(e) {
    this.showHome();
    var title = this.state.title;
    var body = _quillEditor.getText();
    var notebook_id = $('.notebook-selection-dropdown option:selected').val();
    var note = {title: title, body: body, notebook_id: parseInt(notebook_id)};
    NotesApiUtil.createNote(note);

    $('.note-form-outer').removeClass('expanded');
    this.setState({id: note.id, title: note.title, body: note.body});
    this.history.pushState(null, '/home');
  },

  handleBodyChange: function () {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      var note = { id: this.state.id, title: this.state.title, body: _quillEditor.getText() }
      if (edit) { NotesApiUtil.editNote(note); };
      debugger
    }.bind(this), 2000);
  },

  showHome: function () {
    $('.notes-index').show("slow");
    $('.navbar').show("slow");
  },

  setUpHeader: function () {
		var minimenu = this.setUpMiniMenu();
    if (edit) {
      return (
        <div className="note-form-header">
					<div className="note-form-header-minimenu">
						{minimenu}
					</div>
          <div className="expand-button" onClick={this.handleExpand}><i className="fa fa-expand"></i></div>
        </div>);
    } else {
      return (
        <div className="note-form-header">
					<div className="note-form-header-minimenu">
						{minimenu}
					</div>
          <div onClick={this.handleCancelClick}>Cancel</div>
          <div onClick={this.handleNewNoteDoneClick} className="new-note-done-button">Done</div>
        </div>
      )
    }
  },

	setUpMiniMenu: function () {
		var itemInfo = {
			type: "note",
			title: this.state.title,
			id: this.state.id
		}

		return (
			<MiniMenu className="note-form-minimenu" itemInfo={itemInfo} />
		)
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
    this.showHome();
    $('.note-form-outer').removeClass('expanded');
  },

  setUpToolbar: function () {
    var notebooks = this.getNotebooks();

    return (
      <div id="toolbar" className="ql-toolbar-container toolbar">
        <div className="ql-format-group">
          <select className="notebook-selection-dropdown">
            {notebooks}
          </select>
          <select className="ql-font">
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
          <span className="ql-format-separator"></span>
          <select className="ql-size">
            <option value="10px">Small</option>
            <option value="13px" defaultValue>Normal</option>
            <option value="18px">Large</option>
            <option value="32px">Huge</option>
          </select>
          <span className="ql-format-separator"></span>
          <span className="ql-bold ql-format-button"></span>
          <span className="ql-italic ql-format-button"></span>
          <span className="ql-strike ql-format-button"></span>
          <span className="ql-underline ql-format-button"></span>
          <span className="ql-format-separator"></span>
          <span className="ql-link ql-format-button"></span>
          <span className="ql-format-separator"></span>
          <select className="ql-background ql-format-button">
            {defaultColors.map(function (color) {
              return (<option value={color} />);
            })}
          </select>
          <span className="ql-format-separator"></span>
          <select className="ql-color ql-format-button">
            {defaultColors.map(function (color) {
              return (<option value={color} />);
            })}
          </select>
          <span className="ql-format-separator"></span>
          <span className="ql-bullet ql-format-button"/>
          <span className="ql-list ql-format-button"/>
        </div>
      </div>
    );
  },

  setUpQuillEditor: function () {
    _quillEditor = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' },
        'link-tooltip': true
      },
      theme: 'snow'
    });
    _quillEditor.setText(this.state.body);
    _quillEditor.on('text-change', function (delta, source) {
      if (edit && !sameEditor) {
        // debugger
        debugger
        this.handleBodyChange();
        this.setState({body: _quillEditor.getText()});
        // console.log("text change on edit");
        // debugger
      }
      console.log("text change on new");
    }.bind(this));
  },

  getNotebooks: function () {
    var notebooks = NotebookStore.all().map(function (notebook, key) {
      return <option key={key} value={notebook.id}>{notebook.title}</option>;
    });
    return notebooks;
  },

  render: function() {
    var header = this.setUpHeader();
    var toolbar = this.setUpToolbar();

    if (_quillEditor) {
      sameEditor = true;
      _quillEditor.setText(this.state.body);
      sameEditor = false;
    }

    return (
      <div className="note-form-outer">
        {header}
        <div className="editor-outer">
          {toolbar}
          <input
            className="note-form-title"
            type="text"
            onKeyUp={this.handleBodyChange}
            valueLink={this.linkState('title')}
            placeholder="Title your note">
          </input>
          <div id="editor"></div>
        </div>
      </div>
    );
  }
});

module.exports = NoteForm;
