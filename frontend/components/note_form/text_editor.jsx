var React = require('react');
var NoteStore = require('../../stores/note_store');
var NotebookStore = require('../../stores/notebook_store');
var NotesApiUtil = require('../../util/notes_api_util');
var History = require('react-router').History;

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

var _quillEditor;
var fetched = false;
var created = false;

var TextEditor = React.createClass({
  mixins: [History],

  getInitialState: function () {
    console.log("get initial state");

    return { noteId: parseInt(this.props.noteId) };
  },

  componentWillMount: function () {
    console.log("component will mount");
    if (this.props.noteId !== "new") {
      NotesApiUtil.fetchSingleNote(parseInt(this.props.noteId));
    }
  },

  componentDidMount: function () {
    console.log("component did mount");

    this.setUpQuillEditor();
    this.noteListener = NoteStore.addListener(this._onChange);
  },

  _onChange: function () {
    console.log("on change");

    if (this.props.noteId === "new") {
    } else {
      var note = NoteStore.find(this.props.noteId);
      this.setState({ title: note.title, note: note});
      fetched = true;
    }
  },

  componentWillUnmount: function () {
    fetched = false;
    this.noteListener.remove();
  },

  setUpToolbar: function () {
    return (
      <div id="toolbar" className="ql-toolbar-container toolbar">
        <div className="ql-format-group">
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
    _quillEditor = new Quill("#editor", {
      modules: {
        'toolbar': { container: "#toolbar" }
      },
      theme: "snow"
    });

    _quillEditor.on('text-change', function() {
      console.log("i be changin the txt");
      this.handleBodyChange();
    }.bind(this));
  },

  componentWillReceiveProps: function (newProps) {
    console.log("component will receive props");

    var id = newProps.noteId;
    if (id === "new") {
      var note = { title: "New Note", body: "", body_delta: "{\"ops\":[{\"insert\":\"New Note\\n\"}]}" };
    } else {
      var note = NoteStore.find(parseInt(newProps.noteId));
    }
    this.setState({note: note, title: note.title});
  },

  handleTitleChange: function (e) {
    this.setState({title: e.target.value});
    this.editNote();
  },

  handleBodyChange: function () {
    //if new note, create note
    //otherwise edit the note
    var id = this.props.noteId;
    if (id === "new") {
      if (!created) {
        created = true;
        console.log("inside creation");
        var note = { title: this.state.title, body: _quillEditor.getText(), body_delta: JSON.stringify(_quillEditor.getContents()), notebook_id: 244 };
        NotesApiUtil.createNote(note, function(note) {
          this.history.pushState(null, "home/note/" + note.id);
          created = false;
        }.bind(this));
      }
    } else {
      this.editNote();
    }
  },

  editNote: function () {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      var note = { id: this.state.note.id, title: this.state.title, body: _quillEditor.getText(), body_delta: JSON.stringify(_quillEditor.getContents()) };
      NotesApiUtil.editNote(note);
      console.log("EDITED");
    }.bind(this), 3000);
  },

  render: function() {
    console.log("render");
    var toolbar = this.setUpToolbar();

    if (fetched) {
      _quillEditor.setContents(JSON.parse(this.state.note.body_delta));
      fetched = false;
    }

    var input = <input
                  className="note-form-title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  placeholder="Title your note">
                </input>;

    return (
      <div className="editor-outer">
        {toolbar}
        {input}
        <div id="editor"></div>
      </div>
    );
  }
});

module.exports = TextEditor;
