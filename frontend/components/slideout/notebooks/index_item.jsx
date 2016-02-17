var React = require('react');
var NotebookStore = require('../../../stores/notebook_store');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');
var History = require('react-router').History;

var NotebookIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {notebook: this.props.notebook};
  },

  handleNotebookItemClick: function () {
    this.history.pushState(null, 'home/notebook/' + this.state.notebook.id);
  },

  render: function () {
    return (
      <div className="notebook-index-item" onClick={this.handleNotebookItemClick}>
        <div className="notebook-index-item-top group">
          <div className="notebook-index-item-title">{this.props.notebook.title}</div>
        </div>
        <div className="number-of-notes-in-notebook">{this.props.notebook.notes.length}</div>
      </div>
    );
  }
});

module.exports = NotebookIndexItem;
