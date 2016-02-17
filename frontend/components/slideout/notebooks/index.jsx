var React = require('react');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');
var NotebookStore = require('../../../stores/notebook_store');
var NotebookIndexItem = require('./index_item');
var Modal = require('react-modal');

const customStyles = {
  content: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
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

  componentWillUnmount: function () {
    this.notebookListener.remove();
  },

  _onChange: function () {
    this.setState({ notebooks: NotebookStore.all() });
  },

  // openModal: function () {
  //   this.setState({modalIsOpen: true});
  // },
  //
  // closeModal: function () {
  //   this.setState({modalIsOpen: false});
  // },

  handleNewNotebookClick: function (e) {
    var title = $('.new-notebook-title-input').val();
    var notebook = {title: title};
    NotebooksApiUtil.createNotebook(notebook);
    this.closeModal();
  },

  getNotebooks: function () {
    var notebooks = this.state.notebooks.map(function (notebook, key) {
      return (<NotebookIndexItem key={key} notebook={notebook} />);
    });
    return notebooks;
  },

  render: function () {
    var notebooks = this.getNotebooks();

    return (
      <div className="notebook-index">
        <div className="notebook-index-header">
          <div className="notebook-index-header-top group">
            <div className="notebook-index-title">Notebooks</div>
            <div className="add-notebook-button">
              <div onClick={this.openModal}>
                <i className="fa fa-plus"></i>
                <i className="fa fa-book fa-2x"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="notebook-index-items">
          {notebooks}
        </div>

        <Modal isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}
               style={customStyles}>

          <div className="new-notebook-modal">
            <h2 className="new-notebook-modal-title">Create Notebook</h2>
            <input className="new-notebook-title-input"
                   type="text"
                   placeholder="Title your notebook" />

            <div className="new-notebook-modal-bottom group">
              <button className="new-notebook-cancel-button"
                      onClick={this.closeModal}>Cancel</button>
              <button className="new-notebook-create-button"
                      onClick={this.handleNewNotebookClick}>Create Notebook</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
});

module.exports = NotebooksIndex;
