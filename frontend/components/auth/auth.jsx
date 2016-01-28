var React = require('react');

var Auth = React.createClass({
  render: function() {
    return (
      <div className="sign-in/register-page">
        <div className="header">
          <img className="logo"/>
          <h1>Create Account</h1>
        </div>
      </div>
    );
  }
});

module.exports = Auth;
