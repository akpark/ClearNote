var React = require('react');
var History = require('react-router').History;

var NavBar = React.createClass({
  mixins: [History],

  handleNewNoteClick: function() {
    $('.notes-index').hide("slow");
    $('.navbar').hide("slow");
    this.history.pushState(null, "notes/new", {title: "Untitled", body: "Input text here"});
  },

  handleNotesClick: function() {
    this.history.pushState(null, "/");
  },

  handleNotebooksClick: function() {
    this.history.pushState(null, "");
  },

  render: function() {
    return (
      <div className="navbar group">
        <img className="logo" />

        <div className="top-bar">
          <div className="navbar-link" onClick={this.handleNewNoteClick}>New Note</div>
        </div>
        <div className="bottom-bar">
          <div className="navbar-link" onClick={this.handleNotesClick}>Notes</div>
          <div className="navbar-link" onClick={this.handleNotebooksClick}>Notebooks</div>
        </div>

        <img className="profile-pic" />
      </div>
    );
  }
});

module.exports = NavBar;
