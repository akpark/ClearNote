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

  createNotebook: function (notebook, callback) {
    $.ajax({
      method: "POST",
      url: "api/notebooks",
      data: {notebook: notebook},
      dataType: "json",
      success: function (notebook) {
        NotebookActions.receiveSingleNotebook(notebook);
        callback && callback(notebook);
      }
    });
  },

  deleteNotebook: function (notebookId) {
    $.ajax({
      method: "DELETE",
      url: "api/notebooks/" + notebookId,
      dataType: "json",
      success: function (notebook) {
        NotebookActions.deleteNotebook(notebook);
      }
    });
  }

};

module.exports = NotebooksApiUtil;
