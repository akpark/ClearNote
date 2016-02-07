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

        <form onSubmit={ this.submit }>
          <div className="input">
              <input type="text"
                     name="user[username]"
                     placeholder="username or email"/>
          </div>

          <div className="input">
              <input type="password"
                     name="user[password]"
                     placeholder="password"/>
          </div>

          <button>Register!</button>
        </form>
      </div>
    );
  }
});

module.exports = UserForm;
