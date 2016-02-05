var React = require('react');
var History = require('react-router').History;
var Account = require('./account');
var Slideout = require('../slideout/slideout');

var NavBar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({profileSettingsOpen: false});
  },

  componentDidMount: function () {
    $('.account-options-menu').hide();
  },

  handleNewNoteClick: function () {
    $('.notes-index').hide("slow");
    $('.navbar').hide("slow");
    $('.note-form-outer').addClass("expanded");
    this.history.pushState(null, "home/notes/new");
  },

  // handleSearchClick: function () {
  //   // $('.notes-index').hide();
  // },

  handleNotesClick: function () {
    this.history.pushState(null, '/');
  },

  handleNotebooksClick: function () {
    this.props.slideoutClickHandler("notebooks");
  },

  // showSlideout: function () {
  //   $('.slideout').show("slow");
  //   slideoutShown = true;
  //   this.handleBackgroundFade();
  // },
  //
  // hideSlideout: function () {
  //   $('.slideout').hide("slow");
  //   slideoutShown = false;
  //   $('.note-form-outer').fadeTo("slow", 1);
  // },
  //
  // handleBackgroundFade: function () {
  //   $('notes-index').hide();
  //   $('.note-form-outer').fadeTo("slow", 0.2);
  //   $('.note-form-outer').on('click', function () {
  //     this.hideSlideout();
  //   }.bind(this));
  // },

  handleProfileButtonClick: function (e) {
    if (this.state.profileSettingsOpen) {
      $('.account-options-menu').hide();
      this.setState({profileSettingsOpen: false});
    } else {
      $('.account-options-menu').show();
      this.setState({profileSettingsOpen: true});
    }
  },

  render: function() {
    return (
      <div className="navbar group">
        <img className="app-logo" />

        <div className="navbar-top">
          <div className="navbar-link new-note-link"
               onClick={this.handleNewNoteClick}><i className="fa fa-plus"></i>
          </div>
          <div className="navbar-link search-link"
               onClick={this.handleSearchClick}><i className="fa fa-search"></i>
          </div>
        </div>

        <div className="navbar-bottom">
          <div className="navbar-link notes-link"
               onClick={this.handleNotesClick}><i className="fa fa-file-text"></i>
          </div>
          <div className="navbar-link notebooks-link"
               onClick={this.handleNotebooksClick}><i className="fa fa-book"></i>
          </div>
        </div>

        <div className="profile-button"
             onClick={this.handleProfileButtonClick}>ME
          <Account />
        </div>

      </div>
    );
  }
});

module.exports = NavBar;
