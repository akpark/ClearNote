var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var Navbar = require('./navbar/navbar');
var NotesIndex = require('./notes_index/index');
var Slideout = require('./slideout/slideout');

var App = React.createClass({
  getInitialState: function () {
    return ({index: ""});
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();

    $('.slideout').hide();
  },

  slideoutClickHandler: function (index) {
    this.setState({index: index});
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">
        <Navbar slideoutClickHandler={this.slideoutClickHandler} />
        <div className="home-right group">
          <NotesIndex />
          <Slideout index={this.state.index} />
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
