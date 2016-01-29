var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var root = document.getElementById('root');
var Navbar = require('./components/navbar');
var NotesIndex = require('./components/notes_index/index');
var NoteForm = require('./components/noteForm/noteForm');
var NoteStore = require('./stores/note');
var SessionForm = require('./components/sessions/new');
var UserForm = require('./components/users/user_form');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var App = require('./components/app');
var Home = require('./components/home');

var routes = (
  <Route path="/" component={App} >
    <IndexRoute component={ Home } onEnter={_ensureLoggedIn}/>
    <Route path="login" component={ SessionForm } />
    <Route path="users/new" component={ UserForm } />
    <Route path="api/notes/new" component={ NoteForm } onEnter={_ensureLoggedIn}/>
    <Route path="api/notes/:noteId" component={ NoteForm } onEnter={_ensureLoggedIn}/>
  </Route>
);

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    // debugger
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});
