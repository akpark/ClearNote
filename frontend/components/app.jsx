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
    return { slideoutOpen: false, indexInfo: { header: "notes" } };
  },

  componentWillMount: function () {
    SessionsApiUtil.fetchCurrentUser();
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.params.notebookId) {
      this.setState({indexInfo: {header: "notebooks", id: parseInt(newProps.params.notebookId)} });
    }
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">
        <Navbar />
        <div className="home-right group">
          <NotesIndex indexInfo={this.state.indexInfo} />
          {this.props.children}
        </div>

      </div>
    );
  }
});

module.exports = App;
