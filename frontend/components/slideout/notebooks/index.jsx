var React = require('react');
var NotebookStore = require('../../../stores/notebook_store');
var NotebookIndexItem = require('./index_item');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');
var Modal = require('react-modal');

const customStyles = {
  content: {
    top: '25%',
    bottom: '25%',
    left: '25%',
    right: '25%',
  }
};

var NotebooksIndex = React.createClass({
  getInitialState: function () {
    return {notebooks: NotebookStore.all(), modalIsOpen: false};
  },

  componentDidMount: function () {
    this.notebookListener = NotebookStore.addListener(this._onChange);
    NotebooksApiUtil.fetchAllNotebooks();
  },

  componentWillMount: function () {
  },

  componentWillUnmount: function () {
    this.notebookListener.remove();
  },

  _onChange: function () {
    var notebooks = NotebookStore.all();
    this.setState({notebooks: notebooks});
  },

  openModal: function () {
    this.setState({modalIsOpen: true});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false})
  },

  render: function () {
    $('.notes-index').hide();
    var notebooks = this.state.notebooks.map(function (notebook, key) {
      return (
        <NotebookIndexItem key={key} notebook={notebook} />
      )
    });
    return (
      <div className="notebook-index">
        <div className="notebook-index-header">
          <div className="notebook-index-header-top group">
            <div className="notebook-index-title">Notebooks</div>
            <div className="add-notebook-button">
              <div onClick={this.openModal}>New Notebook</div>
            </div>
          </div>

          <div className="notebook-index-header-bottom">
            <input
              className="search-notebook-input"
              type="text"
              placeholder="Find a notebook"/>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2>Create Notebook</h2>
          <button onClick={this.closeModal}>Cancel</button>
          <button onClick={this.handleNewNotebookClick}>Create Notebook</button>
        </Modal>
        <div className="notebook-index-items">
          {notebooks}
        </div>
      </div>
    )
  }
});

module.exports = NotebooksIndex;
