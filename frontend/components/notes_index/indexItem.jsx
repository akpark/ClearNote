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
    this.history.pushState(null, 'api/notes/' + this.props.note.id, note);
  },

  componentWillUnmount: function() {
    this.setState({selected: false});
  },

  render: function() {
    return (
      <div className="note-index-item" onClick={this.showDetail}>
        <div className="note-index-item-inner">
          <div className="note-index-item-title">{this.state.note.title}</div>
          <div className="note-index-item-date">Date Created</div>
          <div className="note-index-item-body">{this.state.note.body}</div>
        </div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
