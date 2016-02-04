var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var Navbar = require('./navbar/navbar');
var NotesIndex = require('./notes_index/index');
var Slideout = require('./slideout/slideout');
var NoteStore = require('../stores/note_store');
var NotesApiUtil = require('../util/notes_api_util');

var App = React.createClass({
  getInitialState: function () {
    return { slideoutOpen: false, slideoutIndex: "" }
  },
  // getInitialState: function () {
  //   return {
  //     indexInfo: {header: "notes", title: "notes"},
  //     slideoutIndex: "",
  //     slideoutOpen: false
  //   };
  // },

  componentWillMount: function () {
    SessionsApiUtil.fetchCurrentUser();
  },

  // componentWillReceiveProps: function (newProps) {
  //   //this is "REPLACING NOTES" depending on the clicked index item FROM slideout
  //   var notesInfo = newProps.location.query;
  //   var indexInfo = { title: notesInfo.title, id: notesInfo.id };
  //
  //   if (notesInfo.header === "notebooks") {
  //     indexInfo[header] = "notebooks"
  //   } else if (notesInfo.header === "tags") {
  //     indexInfo[header] = "tags";
  //   } else if (notesInfo.header === "shortcuts") {
  //     indexInfo[header] = "shortcuts";
  //   }
  //
  //   this.setState({indexInfo: indexInfo});
  // },


  slideoutClickHandler: function (clickedIndex) {
    this.setState({slideoutIndex: clickedIndex});
    this.state.slideoutOpen ? this.setState({slideoutOpen: false}) : this.setState({slideoutOpen: true});
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">

        <Navbar slideoutClickHandler={this.slideoutClickHandler}/>

        <div className="home-right group">
          <NotesIndex />
          <Slideout index={this.state.slideoutIndex} isOpen={this.state.slideoutOpen} />
          {this.props.children}
        </div>

      </div>
    );
  }
});

module.exports = App;
