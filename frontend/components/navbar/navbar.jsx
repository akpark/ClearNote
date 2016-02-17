var React = require('react');
var History = require('react-router').History;
var Account = require('./account');
var Slideout = require('../slideout/slideout');
var NotebookIndex = require('../slideout/notebooks/index');

var searchOpen = false;

var NavBar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({profileSettingsOpen: false});
  },

  componentDidMount: function () {
    $('.account-options-menu').hide();
    $('.slideout-notebooks').hide();
  },

  handleNewNoteClick: function () {
    $('.notes-index').hide("slow");
    $('.navbar').hide("slow");
    $('.note-form-outer').show();
    $('.note-form-outer').addClass("expanded");
    this.history.pushState(null, "home/note/new");
  },

  // handleSearchClick: function () {
  //   if (!searchOpen) {
  //     $('.notes-index').hide();
  //     $('.note-form-outer').hide();
  //     $('.search').show();
  //     searchOpen = true;
  //   } else {
  //     $('.notes-index').show();
  //     $('.note-form-outer').show();
  //     $('.search').hide();
  //     searchOpen = false;
  //   }
  // },

  handleNotesClick: function () {
    this.history.pushState(null, '/home', {index: "notes"});
  },

  // handleNotebooksClick: function () {
  //   this.props.slideoutClickHandler("notebooks");
  // },

  handleNotebooksClick: function () {
    // $('.slideout-notebooks').hide();
    $('.slideout-notebooks').show("slow");
  },

  goHome: function () {
    this.history.pushState(null, '/home', {index: "notes"});
  },

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
    var slideout =
      <div className="slideout-notebooks">
        <NotebookIndex />
      </div>;

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
               onClick={this.handleNotesClick}>
          </div>
          <div className="navbar-link notebooks-link"
               onClick={this.handleNotebooksClick}><i className="fa fa-book"></i>
          </div>
        </div>

        {slideout}

        <div className="navbar-link profile-button" onClick={this.handleProfileButtonClick}>
          <i className="fa fa-user fa-2x"></i>
          <Account />
        </div>

      </div>
    );
  }
});

module.exports = NavBar;
