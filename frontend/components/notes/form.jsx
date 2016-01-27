var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/apiUtil');
var History = require('flux').History;

var NoteForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankAttrs: {
    title: 'Untitled',
    description: ''
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  createNote: function (e) {
    e.preventDefault();
    var note = {};
    note[title] = this.state[title];
    note[description] = this.state[description];
    ApiUtil.createNote(note, function () {
      this.history.pushState(null, "/", {});
    });
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
          <label htmlFor="note-desc"></label>
          <textarea
            id="note-desc"
            valueLink={this.linkState('description')}
          />
        </div>

      </form>
    );
  }
});

module.exports = NoteForm;
