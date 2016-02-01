var React = require('react');
var History = require('react-router').History;
var Account = require('./account');

var NavBar = React.createClass({
  mixins: [History],

  componentDidMount: function () {
    $('.account-options-menu').hide();
  },

  handleNewNoteClick: function () {
    $('.notes-index').hide("slow");
    $('.navbar').hide("slow");
    this.history.pushState(null, "home/notes/new", {title: "Untitled", body: "Input text here"});
  },

  handleSearchClick: function () {
    $('.notes-index').hide();
  },

  handleNotesClick: function () {
    $('.notes-index').show();
    this.history.pushState(null, "/");
  },

  handleNotebooksClick: function () {
    $('.notes-index').hide();
    // $('.slideout').show("slow");
    // $('.notebooks-index').show("slow");
    this.history.pushState(null, "home/notebooks", {});
  },

  handleProfileButtonClick: function (e) {
    //show my profile stuff and option to log out.
    $('.account-options-menu').fadeIn();
  },

  render: function() {
    return (
      <div className="navbar group">
        <img className="logo" href="ClearNote/app/assets/logo.png" />

        <div className="top-bar">
          <div className="navbar-link" onClick={this.handleNewNoteClick}><i className="fa fa-plus"></i></div>
          <div className="navbar-link" onClick={this.handleSearchClick}><i className="fa fa-search"></i></div>
        </div>
        <div className="bottom-bar">
          <div className="navbar-link" onClick={this.handleNotesClick}><i className="fa fa-file-text"></i></div>
          <div className="navbar-link" onClick={this.handleNotebooksClick}><i className="fa fa-book"></i></div>
        </div>

        <div className="profile-button" onClick={this.handleProfileButtonClick}>
          ME
          <Account />
        </div>

        <img className="profile-pic" />
      </div>
    );
  }
});

module.exports = NavBar;
