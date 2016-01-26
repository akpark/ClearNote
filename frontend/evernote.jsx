var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var root = document.getElementById('root');

var App = React.createClass({
  render: function(){
    return (
        <div>
          <header><h1>ClearNote</h1></header>
          {this.props.children}
        </div>
    );
  }
});

// var routes = (
    // <Route path="/" component={App}>
    //   <IndexRoute component={Search}/>
    //   <Route path="benches/new" component={BenchForm}/>
    //   {this.props.children}
    // </Route>
// );

var routes = (
  <Route path="/" component={App}>
    // <IndexRoute component={Notebooks}/>
  </Route>
);


ReactDOM.render(<Router>{routes}</Router>, root);
