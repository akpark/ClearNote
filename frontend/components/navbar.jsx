var React = require('react');

var NavBar = React.createClass({

  handleNewNoteClick: function() {
    this.props.history.pushState(null, "api/notes/new");
  },

  handleSearchClick: function() {

  },

  handleWorkChatClick: function() {

  },

  handleShortcutsClick: function() {

  },

  handleNotesClick: function() {
    this.props.history.pushState(null, "/");
  },

  handleNotebooksClick: function() {
    this.props.history.pushState(null, "/api/notebooks");
  },

  handleTagsClick: function() {

  },

  render: function() {
    return (
      <div className="navbar group">
        <img className="logo" />

        <div className="top-bar">
          <div className="navbar-link" onClick={this.handleNewNoteClick}>New Note</div>
          <div className="navbar-link" onClick={this.handleSearchClick}>Search</div>
          <div className="navbar-link" onClick={this.handleWorkChatClick}>Work Chat</div>
        </div>
        <div className="bottom-bar">
          <div className="navbar-link" onClick={this.handleShortcutsClick}>Shortcuts</div>
          <div className="navbar-link" onClick={this.handleNotesClick}>Notes</div>
          <div className="navbar-link" onClick={this.handleNotebooksClick}>Notebooks</div>
          <div className="navbar-link" onClick={this.handleTagsClick}>Tags</div>
        </div>

        <img className="profile-pic" />
      </div>
    );
  }
});

module.exports = NavBar;
