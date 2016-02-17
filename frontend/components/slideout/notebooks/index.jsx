var React = require('react');
var NotebooksApiUtil = require('../../../util/notebooks_api_util');
var NotebookStore = require('../../../stores/notebook_store');
var NotebookIndexItem = require('./index_item');
var Modal = require('react-modal');

var customStyles = {
  content: {
    top: '27%',
    left: '35%',
    right: 'auto',
    bottom: 'auto',
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

  getNotebooks: function () {
    var notebooks = this.state.notebooks.map(function (notebook, key) {
      return (<NotebookIndexItem key={key} notebook={notebook} toggleSlideout={this.props.toggleSlideout} />);
    }.bind(this));
    return notebooks;
  },

  openModal: function () {
    this.setState({modalIsOpen: true});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
  },

  handleNewNotebookClick: function (e) {
    var title = $('.new-notebook-title-input').val();
    var notebook = {title: title};
    NotebooksApiUtil.createNotebook(notebook);
    this.closeModal();
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

        <Modal
          className="new-notebook-modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>

          <h2 className="new-notebook-modal-title">Create Notebook</h2>
          <input className="new-notebook-title-input"
                 type="text"
                 placeholder="Title your notebook" />

          <div className="new-notebook-modal-bottom group">
            <button onClick={this.closeModal}>Cancel</button>
            <button onClick={this.handleNewNotebookClick}>Create</button>
          </div>
        </Modal>
      </div>
    );
  }
});

module.exports = NotebooksIndex;
