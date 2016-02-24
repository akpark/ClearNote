var React = require('react');
var History = require('react-router').History;
var Account = require('./account');
var NotebookIndex = require('../notebooks/index');

var searchOpen = false;
var slideoutOpen = false;

var NavBar = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({profileSettingsOpen: false, slideoutOpen: false});
  },

  componentDidMount: function () {
    $('.account-options-menu').hide();
    $('.slideout-notebooks').hide();
  },

  handleNewNoteClick: function () {
    this.history.pushState(null, "home/note/new");
    setTimeout(function () {
      debugger
      this.reset();
      $('.notes-index').hide("slow");
      $('.note-form-outer').addClass("expanded");
    }.bind(this), 100);
  },

  handleNotesClick: function () {
    this.reset();
    this.history.pushState(null, '/home', {index: "notes"});
  },

  handleSearchClick: function () {
    this.reset();
    $('.notes-index').hide();
    this.history.pushState(null, 'home/search');
  },

  toggleSlideout: function () {
    if (slideoutOpen) {
      $('.slideout-notebooks').hide("slow");
      $('.home-right').fadeTo("fast", 1);
      slideoutOpen = false;
    } else {
      $('.slideout-notebooks').show("slow");
      $('.home-right').fadeTo("fast",0.2);
      slideoutOpen = true;

      $('.home-right').on('click', function () {
        $('.slideout-notebooks').hide("slow");
        $('.home-right').fadeTo("fast", 1);
        slideoutOpen = false;
      });
    }
  },

  reset: function () {
    if (slideoutOpen) { this.toggleSlideout(); }
    $('.notes-index').show();
  },

  handleProfileButtonClick: function (e) {
    if (this.state.profileSettingsOpen) {
      $('.account-options-menu').hide("slow");
      this.setState({profileSettingsOpen: false});
    } else {
      $('.account-options-menu').show("slow");
      this.setState({profileSettingsOpen: true});
    }
  },

  render: function() {
    var slideout =
      <div className="slideout-notebooks">
        <NotebookIndex toggleSlideout={this.toggleSlideout} />
      </div>;

    return (
      <div className="navbar-outer">
        {slideout}

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
                 onClick={this.toggleSlideout}><i className="fa fa-book"></i>
            </div>
          </div>

          <div
            className="navbar-link profile-button"
            onClick={this.handleProfileButtonClick}>
            <i className="fa fa-user fa-2x"></i>
            <Account />
          </div>

        </div>
      </div>
    );
  }
});

module.exports = NavBar;
