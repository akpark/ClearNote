var NotebookStore = require('../stores/notebook_store');
var NotebookActions = require('../actions/notebook_actions');

var NotebooksApiUtil = {
  fetchAllNotebooks: function () {
    $.ajax({
      method: "GET",
      url: "/api/notebooks",
      dataType: "json",
      success: function(notebooks) {
        NotebookActions.receiveAllNotebooks(notebooks);
      }
    });
  },

  fetchSingleNotebook: function (id) {
    $.ajax({
      method: "GET",
      url: "api/notebooks/" + id,
      dataType: "json",
      success: function(notebook) {
        NotebookActions.receiveSingleNotebook(notebook);
      }
    });
  },

  createNotebook: function (notebook) {
    $.ajax({
      method: "POST",
      url: "api/notebooks",
      data: {notebook: notebook},
      dataType: "json",
      success: function (notebook) {
        NotebookActions.receiveSingleNotebook(notebook);
        alert("notebook has been created!");
      }
    });
  },

  deleteNotebook: function (notebook) {
    $.ajax({
      method: "DELETE",
      url: "api/notebooks/" + notebook.id,
      dataType: "json",
      success: function () {
        console.log("notebook deleted!");
        NotebookActions.deleteNotebook(notebook);
      }
    });
  }

};

module.exports = NotebooksApiUtil;
