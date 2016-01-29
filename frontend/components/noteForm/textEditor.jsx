var React = require('react');
var ReactQuill = require('react-quill');
var ApiUtil = require('../../util/apiUtil');

var TextEditor = React.createClass({
  getInitialState: function() {
    return {note: this.props.note};
  },

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
    return (
      <div className="text-editor">
        <ReactQuill theme="snow"
                    value={this.state.note.body}
                    onChange={this.onTextChange}
                    className="react-quill" />
      </div>
    );
  }
});

module.exports = TextEditor;
