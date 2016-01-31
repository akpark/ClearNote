var React = require('react');
var ReactQuill = require('react-quill');
var ApiUtil = require('../../util/notes_api_util');

var TextEditor = React.createClass({
  handleBodyChange: function(e) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      var note = this.props.note;
      note.body = this.state.body;
      ApiUtil.editNote(note, function() {
        console.log("Successfully edited!");
      });
    }.bind(this), 3000);

    this.setState({body: e.target.value});
  },

  render: function() {
    var note = this.props.note;
    if (!note.id) {

    }

    return (
      <div className="text-editor">

      </div>
    );
  }
});

module.exports = TextEditor;
