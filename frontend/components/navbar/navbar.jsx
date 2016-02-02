var React = require('react');
var History = require('react-router').History;
var Account = require('./account');
var Slideout = require('../slideout/slideout');

var slideoutShown = false;

var NavBar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({slideout: ""});
  },

  componentDidMount: function () {
    $('.account-options-menu').hide();
    $('.slideout').hide();
  },

  handleNewNoteClick: function () {
    $('.notes-index').hide("slow");
    $('.navbar').hide("slow");
    this.history.pushState(null, "home/notes/new", {title: "Untitled", body: "Input text here"});
  },

  handleSearchClick: function () {
    // $('.notes-index').hide();

  },

  handleNotesClick: function () {
    $('.notes-index').show();
    this.history.pushState(null, "/");
  },

  handleNotebooksClick: function () {
    this.props.slideoutClickHandler("notebooks");
    if (!slideoutShown) {
      this.showSlideout();
    } else {
      this.hideSlideout();
    }
  },

  showSlideout: function () {
    $('.slideout').show("slow");
    slideoutShown = true;
    this.handleBackgroundFade();
  },

  hideSlideout: function () {
    $('.slideout').hide("slow");
    slideoutShown = false;
    $('.note-form-outer').fadeTo("slow", 1);
  },

  handleBackgroundFade: function () {
    $('.note-form-outer').fadeTo("slow", 0.2);
    $('.note-form-outer').on('click', function () {
      this.hideSlideout();
    }.bind(this));
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
          <div className="navbar-link notebooks-index-link" onClick={this.handleNotebooksClick}><i className="fa fa-book"></i></div>
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
