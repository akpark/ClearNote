var React = require('react');
var NoteStore = require('../../stores/note_store');
var History = require('react-router').History;

var NoteIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {note: this.props.note};
  },

  showDetail: function(e) {
    $(".note-index-item").removeClass("selected");
    $(e.currentTarget).addClass('selected');

    this.history.pushState(null, 'home/notes/' + this.props.note.id, this.state.note);
  },

  componentWillUnmount: function () {
    this.noteIndexItemListener.remove();
  },

  componentDidMount: function () {
    this.noteIndexItemListener = NoteStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({note: NoteStore.find(this.state.note.id)});
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
