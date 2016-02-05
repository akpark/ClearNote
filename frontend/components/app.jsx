var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var Navbar = require('./navbar/navbar');
var NotesIndex = require('./notes/index');
var Slideout = require('./slideout/slideout');
var NoteStore = require('../stores/note_store');
var NotesApiUtil = require('../util/notes_api_util');

var App = React.createClass({
  getInitialState: function () {
    return { slideoutOpen: false, slideoutIndex: "", indexInfo: { header: "notes", title: "notes" } }
  },

  componentWillMount: function () {
    SessionsApiUtil.fetchCurrentUser();
  },

  // componentWillReceiveProps: function (newProps) {
  //   debugger
  //   console.log("componentWillReceiveProps app");
  //   if (!newProps.params.noteId && newProps.location) {
  //     console.log('entered');
  //     var params = newProps.location.query;
  //     var notes = [];
  //     switch (params.header) {
  //       case "notes":
  //         break;
  //       case "notebooks":
  //         break;
  //       case "tags":
  //         //find notes by tag
  //         break;
  //       case "shortcuts":
  //         //find notes by shortcuts
  //         break;
  //     }
  //     this.setState({indexInfo: {header: params.header, title: params.title, id: params.id}});
  //   }
  // },

  slideoutClickHandler: function (clickedIndex) {
    this.setState({slideoutIndex: clickedIndex});
    if (this.state.slideoutOpen) {
      this.closeSlideout();
    } else {
      this.openSlideout();
    }
  },

  closeSlideout: function () {
    this.setState({slideoutOpen: false});
    $('.note-form-outer').fadeTo("slow", 1);
    console.log("entered");
  },

  openSlideout: function () {
    this.setState({slideoutOpen: true});
    $('.note-form-outer').fadeTo("slow", 0.2);
    $('.note-form-outer').on('click', function () {
      this.closeSlideout();
      // $('.note-form-outer').fadeTo('slow', 1);
    }.bind(this));
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">
        <Navbar slideoutClickHandler={this.slideoutClickHandler}/>
        <div className="home-right group">
          <NotesIndex indexInfo={this.state.indexInfo}/>
          <Slideout index={this.state.slideoutIndex} isOpen={this.state.slideoutOpen} />
          {this.props.children}
        </div>

      </div>
    );
  }
});

module.exports = App;
