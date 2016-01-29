var React = require('react');
var ReactQuill = require('react-quill');
var ApiUtil = require('../../util/apiUtil');
// var ReactQuill = require('../../vendor/react-quill');

var TextEditor = React.createClass({
  getInitialState: function() {
    return {body: this.props.note.body};
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
                    value={this.state.body}
                    onChange={this.handleBodyChange} />
      </div>
    );
  }
});

module.exports = TextEditor;
