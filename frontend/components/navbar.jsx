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
      <ul>
        <div>
          <li onClick={this.handleNewNoteClick}>New Note</li>
          <li onClick={this.handleNotesClick}>Notes</li>
          <li onClick={this.handleNotebooksClick}>Notebooks</li>
        </div>
      </ul>
    )
  }
});

module.exports = NavBar;
