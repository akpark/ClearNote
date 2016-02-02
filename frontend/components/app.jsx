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
    return ({slideoutIndex: "", outerIndex: "", notes: [], header: ""});
  },

  componentDidMount: function () {
    // CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();

    $('.slideout').hide();
  },

  slideoutClickHandler: function (index) {
    this.setState({slideoutIndex: index});
  },

  _onChange: function () {
    // if (empty) {
    //   this.setState({notes: NoteStore.all()});
    // }
  },

  componentWillMount: function () {
    NotesApiUtil.fetchAllNotes();
  },

  componentWillReceiveProps: function (newProps) {
    NotesApiUtil.fetchAllNotes();
    var notes = newProps.location.query;
    if (notes.notes === undefined) {
      this.setState({notes: NoteStore.all(), header: "NOTES"})
    } else {
      this.setState({notes: JSON.parse(notes.notes), header: notes.header});
      $('.slideout').hide();
    }
    //ADD IN TAG'S NOTES and SHORTCUTS
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">
        <Navbar slideoutClickHandler={this.slideoutClickHandler} />
        <div className="home-right group">
          <NotesIndex notes={this.state.notes} header={this.state.header} />
          <Slideout index={this.state.slideoutIndex} />
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;



// <OuterIndex index={this.state.outerIndex}/>
