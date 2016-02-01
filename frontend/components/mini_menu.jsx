var React = require('react');
var Modal = require('react-modal');
var NotesApiUtil = require('../util/notes_api_util');
var History = require('react-router').History;

const customStyles = {
  content: {
    top: '25%',
    bottom: '25%',
    left: '25%',
    right: '25%',
  }
};

var note = false;

var MiniMenu = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {modalIsOpen: false}
  },

  handleDeleteClick: function () {
    var note = this.props.note;
    var notebook = this.props.notebook;
    debugger
    if (note) {
      NotesApiUtil.deleteNote(note);
      this.history.pushState(null, 'home');
    } else {
      NotebooksApiUtil.deleteNotebook(notebook);
      this.history.pushState(null, 'home/notebooks')
    }
    this.closeModal();
  },

  openModal: function () {
    this.setState({modalIsOpen: true});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
  },

  componentWillMount: function () {
    var noteProp = this.props.note;
    var notebookProp = this.props.notebook;
    if (noteProp) {
      note = true;
    } else {
      note = false;
    }
  },

  setUpModal: function (title) {
    var title = (note) ? "Note" : "Notebook";

    return (
      <Modal
        className="delete-modal"
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles} >

        <i className="fa fa-trash fa-2x"></i>
        <h2>Delete {title}</h2>
        <h2 className="delete-modal-title">Are you sure you want to delete ?</h2>
        <div className="delete-modal-bottom group">
          <button className="delete-modal-cancel-button" onClick={this.closeModal}>Cancel</button>
          <button className="delete-modal-delete-button" onClick={this.handleDeleteClick}>Delete</button>
        </div>
      </Modal>
    );
  },

  render: function () {
    var modal = this.setUpModal();
    return (
      <div className="mini-menu-container">
        <div className="mini-menu group">
          <div className="mini-menu-delete" onClick={this.openModal}><i className="fa fa-trash fa-lg"></i></div>
        </div>
          {modal}
      </div>
    )
  }
});

module.exports = MiniMenu;
