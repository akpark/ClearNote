var React = require('react');
var Modal = require('react-modal');
var NotesApiUtil = require('../util/notes_api_util');
var History = require('react-router').History;

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: '1px solid #fff'
  }
};

var MiniMenu = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {modalIsOpen: false}
  },

  setUpModal: function () {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}>

        <div className="delete-modal-middle">
          <div className="delete-modal-inner">
            <i className="fa fa-trash-o fa-2x"></i>
            <div className="delete-modal-title">Delete {this.props.itemInfo.type}</div>
            <h2 className="delete-modal-question">Are you sure you want to delete <b>{this.props.itemInfo.title}</b></h2>
            <div className="delete-modal-bottom group">
              <button className="delete-modal-cancel-button" onClick={this.closeModal}>Cancel</button>
              <button className="delete-modal-delete-button" onClick={this.handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  },

  openModal: function () {
    console.log("open modal");
    this.setState({modalIsOpen: true});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
  },

  handleDeleteClick: function (e) {
    switch (this.state.parentInfo.type) {
      case "note":
        console.log('entered');
        NotesApiUtil.deleteNote(this.state.parentInfo.id);
        break;
      // case "notebook":
      //   NotebooksApiUtil.deleteNotebook(this.state.parentInfo.id);
      //   break;
    }
    this.closeModal();
  },

  render: function () {
    var modal = this.setUpModal();

    return (
      <div className="mini-menu-container">
        <div className="mini-menu group">
          <div className="mini-menu-link trash" onClick={this.openModal}><i className="fa fa-trash fa-lg"></i></div>
        </div>
        {modal}
      </div>
    )
  }

});

module.exports = MiniMenu;
