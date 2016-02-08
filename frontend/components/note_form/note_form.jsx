var React = require('react');
var TextEditor = require('./text_editor');
var NotesApiUtil = require('../../util/notes_api_util');
var ReactQuill = require('react-quill');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;
var NoteStore = require('../../stores/note_store');
var NotebookStore = require('../../stores/notebook_store');
var NotebooksApiUtil = require('../../util/notebooks_api_util');
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
    edit = (this.props.params.noteId === "new") ? false : true;
    var note = NoteStore.find(parseInt(this.props.params.noteId));
    return ({id: note.id, title: note.title, body: note.body, body_delta: JSON.parse(note.body_delta)});
  },

  componentDidMount: function() {
		debugger
    this.setUpQuillEditor();
  },

  componentWillMount: function () {
    NotesApiUtil.fetchAllNotes();
    NotebooksApiUtil.fetchAllNotebooks();
  },

  componentWillReceiveProps: function(newProps) {
		debugger
    if (newProps.params.noteId === "new") {
      edit = false;
      this.setState({
				title: "",
				body: "",
				body_delta: {}
			});
      return;
    }
		edit = true;
    var note = NoteStore.find(parseInt(newProps.params.noteId));
    this.setState({id: note.id, title: note.title, body_delta: JSON.parse(note.body_delta)});
  },

  handleNewNoteDoneClick: function(e) {
    var title = this.state.title;
    var body_delta = _quillEditor.getContents();
    var notebook_id = $('.notebook-selection-dropdown option:selected').val();
    var note = {title: title, body: _quillEditor.getText(), body_delta: JSON.stringify(body_delta), notebook_id: parseInt(notebook_id)};
    NotesApiUtil.createNote(note);

		//we want to get new id!
    this.showHome();
    $('.note-form-outer').removeClass('expanded');
		this.setState({id: this.state.id+1, body_delta: body_delta});
    edit = true;
  },

  handleBodyChange: function () {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      var notebook_id = parseInt($('.notebook-selection-dropdown').val());
      var note = {
									 id: this.state.id,
									 title: this.state.title,
									 body: _quillEditor.getText(),
									 body_delta: JSON.stringify(_quillEditor.getContents()),
									 notebook_id: notebook_id
								 };
      if (edit) { NotesApiUtil.editNote(note); };
    }.bind(this), 2000);
		this.setState({body_delta: _quillEditor.getContents()});
		// _quillEditor.setContents(JSON.parse(note.body_delta));
  },

  showHome: function () {
    $('.notes-index').show("slow");
    $('.navbar').show("slow");
  },

  setUpHeader: function () {
    if (edit) {
      return (
        <div className="note-form-header">
          <div className="expand-button" onClick={this.handleExpand}><i className="fa fa-expand"></i></div>
        </div>);
    } else {
      return (
        <div className="note-form-header">
          <div className="new-note-form-cancel-button" onClick={this.handleCancelClick}>Cancel</div>
          <div className="new-note-form-done-button" onClick={this.handleNewNoteDoneClick}>Done</div>
        </div>
      );
    }
  },

	setUpMiniMenu: function () {
		var itemInfo = {
			type: "note",
			title: this.state.title,
			id: this.state.id
		};

		return (
			<MiniMenu className="note-form-minimenu" itemInfo={itemInfo} />
		);
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
            {defaultColors.map(function (color, key) {
              return (<option key={key} value={color} />);
            })}
          </select>
          <span className="ql-format-separator"></span>
          <select className="ql-color ql-format-button">
            {defaultColors.map(function (color, key) {
              return (<option key={key} value={color} />);
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
		debugger
    console.log('set up quill editor');
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
        this.handleBodyChange();
      }
    }.bind(this));
  },

  getNotebooks: function () {
    var notebooks = NotebookStore.all().map(function (notebook, key) {
      return <option key={key} value={notebook.id}>{notebook.title}</option>;
    });
    return notebooks;
  },

  render: function() {
		debugger
    var header = this.setUpHeader();
    var toolbar = this.setUpToolbar();

    if (_quillEditor) {
			debugger
      sameEditor = true;
			if (!edit) {
	      _quillEditor.setText("");
			} else {
				_quillEditor.setContents(this.state.body_delta);
			}
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
