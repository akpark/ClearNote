var React = require('react');

var NavBar = React.createClass({
  handleNewNoteClick: function() {
    this.props.history.pushState(null, "api/notes/new");
  },

  handleNotesClick: function() {
    this.props.history.pushState(null, "/");
  },

  handleNotebooksClick: function() {
    this.props.history.pushState(null, "/api/notebooks");
    //show notebooks as a modal
  },

  render: function() {
    return (
      <div className="navbar group">
        <img className="logo" />
        <div className="navbar-link" onClick={this.handleNewNoteClick}>New Note</div>
        <div className="navbar-link" onClick={this.handleNotesClick}>Notes</div>
        <div className="navbar-link" onClick={this.handleNotebooksClick}>Notebooks</div>
      </div>
    );
  }
});

module.exports = NavBar;
