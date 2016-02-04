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

  handleNotebookItemClick: function () {
    this.history.pushState(
      null,
      '/home',
      {header: "notebooks", title: this.state.notebook.title, id: this.state.notebook.id }
    );
    $('.slideout').hide();
  },

  render: function () {
    var notebook = this.state.notebook;

    return (
      <div className="notebook-index-item" onClick={this.handleNotebookItemClick}>
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
