var React = require('react');
var NoteStore = require('../../stores/note_store');
var History = require('react-router').History;
var MiniMenu = require('../mini_menu');

var NoteIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {note: this.props.note, selected: this.props.selected};
  },

  componentWillMount: function () {
    //fix this
    if (this.state.selected) {
      this.indexItemClick();
    }
  },

  indexItemClick: function () {
    switch (this.props.type) {
      case "notes":
        this.history.pushState(null, 'home/note/' + this.props.note.id);
        break;
      case "notebooks":
        this.history.pushState(null, 'home/notebook/' + this.props.notebookId + '/note/' + this.props.note.id);
        break;
    }
  },

  componentDidMount: function () {
    this.noteIndexItemListener = NoteStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({note: NoteStore.find(this.props.note.id)});

    if (this.state.selected && this.props.className !== "selected") {
      this.indexItemClick();
    }
  },

  componentWillUnmount: function () {
    this.noteIndexItemListener.remove();
  },

  showDetail: function(e) {
    $(".note-index-item").removeClass("selected");
    $(e.currentTarget).addClass('selected');

    this.indexItemClick();
  },

  getUpdatedDate: function () {
    var note = this.props.note;
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
    var elapsed = this.getUpdatedDate();
    var klass = "note-index-item";
    if (this.state.selected) {
      klass += " selected";
    }

    return (
      <div className={klass} onClick={this.showDetail}>

        <div className="note-index-item-inner">
          <div className="note-index-item-top group">
            <div className="note-index-item-title">{this.props.note.title}</div>
          </div>
          <div className="note-index-item-date">{elapsed}</div>
          <div className="note-index-item-body">{this.props.note.body}</div>
        </div>

      </div>
    );
  }
});

module.exports = NoteIndexItem;
