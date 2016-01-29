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

var App = React.createClass({
  render: function(){
    return (
        <div className="app group">
          <Navbar history={this.props.history}/>
          <NotesIndex />
          {this.props.children}
        </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path="api/notes/new" component={NoteForm} />
    <Route path="api/notes/:noteId" component={NoteForm} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});

// var editor = new Quill('#editor');
// editor.addModule('toolbar', { container: '#toolbar' });
