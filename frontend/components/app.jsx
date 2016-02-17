var React = require('react');
var SessionsApiUtil = require('../util/sessions_api_util');
var CurrentUserStore = require('../stores/current_user_store');
var NotesApiUtil = require('../util/notes_api_util');
var NoteStore = require('../stores/note_store');
var Navbar = require('./navbar/navbar');
var NotesIndex = require('./notes/index');
var Search = require('./search');

var App = React.createClass({
  getInitialState: function () {
    return { slideoutOpen: false, slideoutIndex: "", indexInfo: { header: "notes", title: "notes" } };
  },

  componentWillMount: function () {
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">
        <Navbar />
        <div className="home-right group">
          <NotesIndex />
          {this.props.children}
        </div>

      </div>
    );
  }
});

module.exports = App;
