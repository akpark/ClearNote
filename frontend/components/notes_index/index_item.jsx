var React = require('react');
var NoteStore = require('../../stores/note_store');
var History = require('react-router').History;
var MiniMenu = require('../mini_menu');

var NoteIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {note: this.props.note};
  },

  componentWillMount: function () {
    var noteId = parseInt(NoteStore.findFirst());

    if (this.state.note.id === noteId) {
      this.history.pushState(null, 'home/notes/' + noteId, this.state.note);
    }
  },

  componentDidMount: function () {
    this.noteIndexItemListener = NoteStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.noteIndexItemListener.remove();
  },

  _onChange: function () {
    this.setState({note: this.props.note});
  },

  showDetail: function(e) {
    $(".note-index-item").removeClass("selected");
    $(e.currentTarget).addClass('selected');

    this.history.pushState(null, 'home/notes/' + this.state.note.id, this.state.note);
  },

  render: function() {
    return (
      <div className="note-index-item" onClick={this.showDetail}>
        <div className="note-index-item-inner">
          <div className="note-index-item-top group">
            <div className="note-index-item-title">{this.state.note.title}</div>
            <MiniMenu note={this.state.note}/>
          </div>
          <div className="note-index-item-date">Date Created</div>
          <div className="note-index-item-body">{this.state.note.body}</div>
        </div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
