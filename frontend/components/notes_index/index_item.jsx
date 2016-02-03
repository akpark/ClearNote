var React = require('react');
var NoteStore = require('../../stores/note_store');
var History = require('react-router').History;
var MiniMenu = require('../mini_menu');

var NoteIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    var note = NoteStore.find(this.props.note.id);
    return {note: note};
  },

  componentWillMount: function () {
    var noteId = NoteStore.findFirst().id

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
    // this.setState({note: this.props.note});
    var note = NoteStore.find(this.props.note.id);
    this.setState({note: note});
  },

  showDetail: function(e) {
    $(".note-index-item").removeClass("selected");
    $(e.currentTarget).addClass('selected');

    this.history.pushState(null, 'home/notes/' + this.state.note.id, this.state.note);
  },

  getCreatedDate: function () {
    var note = this.state.note;
    var updated_at = new Date(note.updated_at);
    var today = new Date();
    var elapsedTime = today.getTime() - updated_at.getTime();

    var seconds = Math.round(elapsedTime/1000);
    var minutes = 0;
    var hour = 0;
    var days = 0;
    var weekds = 0;
    var time = seconds + " seconds";
    if (seconds > 60) {
      minutes = Math.round(seconds/60);
      time = minutes + " minutes";
      if (minutes > 60) {
        hours = Math.round(minutes/60);
        time = hours + " hours";
        if (hours > 24) {
          days = Math.round(hours/24);
          time = days + " days";
          if (days > 7) {
            weeks = Math.round(days/7);
            time = weeks + " weeks";
          }
        }
      }
    }

    return time + " ago";
  },

  render: function() {
    var elapsed = this.getCreatedDate();

    return (
      <div className="note-index-item" onClick={this.showDetail}>
        <div className="note-index-item-inner">
          <div className="note-index-item-top group">
            <div className="note-index-item-title">{this.state.note.title}</div>
            <MiniMenu note={this.state.note}/>
          </div>
          <div className="note-index-item-date">{elapsed}</div>
          <div className="note-index-item-body">{this.state.note.body}</div>
        </div>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
