var React = require('react');
var NotebookStore = require('../../../stores/notebook_store');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');


var NotebookIndexItem = React.createClass({
  getInitialState: function () {
    return {notebook: this.props.notebook};
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  handleNewNotebokClick: function (e) {
    //modal for new notebook
    // NotebooksApiUtil.createNotebook()
  },

  render: function () {
    var notebook = this.props.notebook;

    return (
      <div className="notebook-index-item" onClick={this.handleItemClick}>
        <div className="notebook-index-item-title">{notebook.title}</div>

      </div>
    )
  }
});

module.exports = NotebookIndexItem;
