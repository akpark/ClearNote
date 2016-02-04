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
    return ({slideoutIndex: "", outerIndex: "", indexInfo: {header: "notes", title: "notes"}});
  },

  componentWillMount: function () {
    SessionsApiUtil.fetchCurrentUser();
  },

  componentWillReceiveProps: function (newProps) {
    var notesInfo = newProps.location.query;
    var indexInfo = { title: notesInfo.title, id: notesInfo.id };

    if (notesInfo.header === "notebooks") {
      // var header = {header: "notebooks", title: notesInfo.title, id: notesInfo.id};
      indexInfo[header] = "notebooks"
      this.setState({indexInfo: indexInfo});
    } else if (notesInfo.header === "tags") {
      indexInfo[header] = "tags";
      this.setState({indexInfo: indexInfo});
    } else if (notesInfo.header === "shortcuts") {
      indexInfo[header] = "shortcuts";
      this.setState({indexInfo: indexInfo});
    }
  },

  componentDidMount: function () {
    $('.slideout').hide();
  },

  slideoutClickHandler: function (clickedIndex) {
    this.setState({slideoutIndex: clickedIndex});
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">

        <Navbar slideoutClickHandler={this.slideoutClickHandler} />

        <div className="home-right group">
          <NotesIndex indexInfo={this.state.indexInfo}/>
          <Slideout index={this.state.slideoutIndex} />
          {this.props.children}
        </div>

      </div>
    );
  }
});

module.exports = App;
