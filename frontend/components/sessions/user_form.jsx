var React = require('react');
var History = require('react-router').History;
var UsersApiUtil = require('../../util/users_api_util');
var NotebooksApiUtil = require('../../util/notebooks_api_util');
var NotesApiUtil = require('../../util/notes_api_util');

var UserForm = React.createClass({
  mixins: [History],

  //set up the user with default
  setUpUser: function (user) {
    var newNotebook = {
      title: "Welcome",
      author_id: user.id
    }

    NotebooksApiUtil.createNotebook(newNotebook, function(notebook) {
      var newNote = {
        title: "Welcome",
        body: "Welcome to Pad. The app to store your thoughts and ideas on a mobile notepad.",
        body_delta: "{'ops':[{'retain':22},{'attributes':{'size':'32px'},'insert':'e'}]}",
        author_id: user.id,
        notebook_id: notebook.id
      }
      NotesApiUtil.createNote(newNote);
    });
  },

  submit: function (e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};
    fields.forEach(function (field) {
      credentials[field.name] = field.value;
    });

    UsersApiUtil.createUser(credentials, function(user) {
      this.setUpUser(user);
      this.history.pushState(null, "home");
    }.bind(this));
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
