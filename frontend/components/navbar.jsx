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
      <ul className="navbar group">
        <img className="logo" />
        <li onClick={this.handleNewNoteClick}>New Note</li>
        <li onClick={this.handleNotesClick}>Notes</li>
        <li onClick={this.handleNotebooksClick}>Notebooks</li>
      </ul>
    );
  }
});

module.exports = NavBar;
