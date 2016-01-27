var React = require('react');
var NoteStore = require('../../stores/note');
var History = require('react-router').History;
var NoteDetail = require('./detail');

var NoteIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {note: this.props.note};
  },

  showDetail: function() {
    var note = this.state.note;
    this.history.pushState(null, 'api/notes/' + this.props.note.id, note);
  },

  componentWillUnmount: function() {
    this.setState({selected: false});
  },

  render: function() {
    var note = this.state.note;

    return (
      <div>
        <div onClick={this.showDetail} className="note-index-item">
          <div>{note.title}</div>
        </div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
