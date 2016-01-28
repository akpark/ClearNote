var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/apiUtil');
var History = require('react-router').History;

var NoteForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    title: 'Untitled',
    body: ''
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  createNote: function (e) {
    e.preventDefault();
    var note = {};
    note.title = this.state.title;
    note.body = this.state.body;
    ApiUtil.createNote(note, function () {
      this.history.pushState(null, "/", {});
    }.bind(this));
  },

  render: function() {
    return (
      <form className="new-note" onSubmit={this.createNote}>
        <div>
          <label htmlFor="note-title"></label>
          <input
            type="text"
            id="note-title"
            valueLink={this.linkState("title")}
          />
        </div>

        <div>
          <label htmlFor="note-body"></label>
          <textarea
            id="note-body"
            valueLink={this.linkState('body')}
          />
        </div>

        <button className="create-button">Done</button>

      </form>
    );
  }
});

module.exports = NoteForm;
