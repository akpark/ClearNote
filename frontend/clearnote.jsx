var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var root = document.getElementById('root');
var NotesIndex = require('./components/notes/index');
var NoteForm = require('./components/note_form/note_form');
var NoteStore = require('./stores/note_store');
var SessionForm = require('./components/sessions/new');
var UserForm = require('./components/sessions/user_form');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var App = require('./components/app');
var Home = require('./components/home');
var Slideout = require('./components/slideout/slideout');
var NotebooksIndex = require('./components/slideout/notebooks/index');
var WelcomeForm = require('./components/sessions/session');

var router = (
  <Router>
    <Route path="/" onEnter={_ensureLoggedIn}/>
    <Route path="welcome" component={ WelcomeForm } />
    <Route path="register" component={ UserForm } />
    <Route path="home" component={ App } onEnter={_ensureLoggedIn}>
      <Route path="notes">
        <Route path=":noteId" component={ NoteForm }/>
      </Route>
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/welcome");
    }
    callback();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(router, root);
});
