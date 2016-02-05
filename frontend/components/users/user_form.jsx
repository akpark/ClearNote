var React = require('react');
var History = require('react-router').History;

var UserForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    this.history.pushState(null, 'home/notes');
  },

  render: function() {
    return (
      <div className="sign-up">
        <h1>Create Account</h1>

        <form onSubmit={ this.submit }>
          <div className="input">
            <label>Your Email Address
              <input type="text"
                     name="user[username]"/>
            </label>
          </div>

          <div className="input">
            <label>Create a password
              <input type="password"
                     name="user[password]"/>
            </label>
          </div>

          <button>Create Account</button>
        </form>
      </div>
    );
  }
});

module.exports = UserForm;
