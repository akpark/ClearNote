var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var root = document.getElementById('root');
var NavBar = require('./components/navbar');

var App = React.createClass({
  render: function(){
    return (
        <div>
          <header></header>
          {this.props.children}
        </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={NavBar}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});
