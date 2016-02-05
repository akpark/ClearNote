var React = require('react');
var ReactQuill = require('react-quill');
var NotebookStore = require('../../stores/notebook_store');

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

var TextEditor = React.createClass({
  getInitialState: function () {
    debugger
    edit = (this.props.params.noteId === "new") ? false : true;
    var note = NoteStore.find(parseInt(this.props.params.noteId));
    return ({id: note.id, title: note.title, body: note.body});
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.params.noteId === "new") {
      edit = false;
      this.setState({title: "", body: ""});
      return;
    }
    var note = NoteStore.find(parseInt(newProps.params.noteId));
    this.setState({id: note.id, title: note.title, body: note.body});
  },

  handleBodyChange: function () {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      var note = { id: this.state.id, title: this.state.title, body: _quillEditor.getText() };
      if (edit) { NotesApiUtil.editNote(note); }
    }.bind(this), 2000);
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

  // setUpQuillEditor: function () {
  //   console.log('set up quill editor');
  //   _quillEditor = new Quill('#editor', {
  //     modules: {
  //       'toolbar': { container: '#toolbar' },
  //       'link-tooltip': true
  //     },
  //     theme: 'snow'
  //   });
  //   _quillEditor.setText(this.state.body);
  //   _quillEditor.on('text-change', function (delta, source) {
  //     if (edit && !sameEditor) {
  //       this.handleBodyChange();
  //       this.setState({body: _quillEditor.getText()});
  //     }
  //     console.log("text change on new");
  //   }.bind(this));
  // },

  getNotebooks: function () {
    var notebooks = NotebookStore.all().map(function (notebook, key) {
      return <option key={key} value={notebook.id}>{notebook.title}</option>;
    });
    return notebooks;
  },

  render: function() {
    var toolbar = this.setUpToolbar();
    debugger
    // if (_quillEditor) {
    //   sameEditor = true;
    //   _quillEditor.setText(this.state.body);
    //   sameEditor = false;
    // }

    return (
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
    );
  }
});

module.exports = TextEditor;
