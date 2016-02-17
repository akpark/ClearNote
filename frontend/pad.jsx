var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var root = document.getElementById('root');
var NotesIndex = require('./components/notes/index');
var NoteStore = require('./stores/note_store');
var SessionForm = require('./components/sessions/new');
var UserForm = require('./components/sessions/user_form');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var App = require('./components/app');
var Home = require('./components/home');
var NotebooksIndex = require('./components/slideout/notebooks/index');
var WelcomeForm = require('./components/sessions/session');
var NoteForm = require('./components/note_form/note_form2');
var Search = require('./components/search');

var router = (
  <Router>
    <Route path="/" component={ WelcomeForm } onEnter={_redirectIfLoggedIn}/>
    <Route path="home" component={ App } onEnter={_ensureLoggedIn}>
      <Route path="notebook/:notebookId" >
        <Route path="note/:noteId"/>
      </Route>
      <Route path="note/:noteId" component={ NoteForm } />
      <Route path="search" component={ Search } />
    </Route>
  </Router>
);

function _redirectIfLoggedIn(nextState, replace, callback) {
  SessionsApiUtil.fetchCurrentUser(function () {
    if (CurrentUserStore.isLoggedIn()) {
      replace({}, "/home");
    }
    callback();
  });
}

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/");
    }
    callback();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(router, root);
});
