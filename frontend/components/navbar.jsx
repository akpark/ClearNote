var React = require('react');

var NavBar = React.createClass({
  handleNewNoteClick: function() {

  },

  handleNotesClick: function() {
    this.props.history.pushState(null, "api/notes");
  },

  handleNotebooksClick: function() {

  },

  render: function() {
    return (
      <ul className="navbar group">
        <img class="logo" />
        <li onClick={this.handleNewNoteClick}>New Note</li>
        <li onClick={this.handleNotesClick}>Notes</li>
        <li onClick={this.handleNotebooksClick}>Notebooks</li>
      </ul>
    )
  }
});

module.exports = NavBar;
