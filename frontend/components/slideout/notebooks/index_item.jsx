var React = require('react');
var NotebookStore = require('../../../stores/notebook_store');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');
var MiniMenu = require('../../mini_menu');
var History = require('react-router').History;

var NotebookIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {notebook: this.props.notebook};
  },

  componentWillUnmount: function () {

  },

  handleItemClick: function () {
    var notes = NoteStore.findByNotebook(this.state.notebook.id);
    this.history.pushState(null, '/home', {notes: JSON.stringify(notes), header: this.props.notebook.title});
  },

  render: function () {
    var notebook = this.props.notebook;

    return (
      <div className="notebook-index-item" onClick={this.handleItemClick}>
        <div className="notebook-index-item-top group">
          <div className="notebook-index-item-title">{notebook.title}</div>
          <MiniMenu notebook={notebook}/>
        </div>
        <div className="number-of-notes-in-notebook">{notebook.notes}</div>
      </div>
    )
  }
});

module.exports = NotebookIndexItem;
