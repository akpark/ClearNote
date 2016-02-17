var React = require('react');
var NotebookStore = require('../../../stores/notebook_store');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');
var Modal = require('react-modal');
var History = require('react-router').History;

var customStyles={
  content: {
    top: '30%',
    left: '35%',
    right: 'auto',
    bottom: 'auto',
  }
};

var NotebookIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {notebook: this.props.notebook, modalIsOpen: false};
  },

  handleNotebookItemClick: function (e) {
    if (e.target.className === "fa fa-trash") {
      return;
    }
    this.props.toggleSlideout();
    this.history.pushState(null, 'home/notebook/' + this.state.notebook.id);
  },

  openModal: function () {
    this.setState({ modalIsOpen: true });
  },

  closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  handleNotebookDelete: function () {
    NotebooksApiUtil.deleteNotebook(this.props.notebook.id);

  },

  render: function () {
    return (
      <div className="notebook-index-item" onClick={this.handleNotebookItemClick}>

        <Modal
          className="delete-modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>

          <h1>Are you sure you want to delete this notebook?</h1>
          <button onClick={this.closeModal}>Cancel</button>
          <button onClick={this.handleNotebookDelete}>Delete</button>
        </Modal>

        <div className="notebook-index-item-top group">
          <div className="notebook-index-item-title">{this.props.notebook.title}</div>
          <div className="notebook-index-item-trash" onClick={this.openModal}><i className="fa fa-trash"></i></div>
        </div>
        <div className="number-of-notes-in-notebook">{this.props.notebook.notes.length}</div>
      </div>
    );
  }
});

module.exports = NotebookIndexItem;
