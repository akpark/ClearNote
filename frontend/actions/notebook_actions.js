var NotebookConstants = require('../constants/notebook_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var NotebookActions = {
  receiveAllNotebooks: function (notebooks) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOKS_RECEIVED,
      notebooks: notebooks
    });
  },

  receiveSingleNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_RECEIVED,
      notebook: notebook
    });
  },

  editNotebook: function (note) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.EDIT_NOTEBOOK,
      note: note
    });
  },

  deleteNotebook: function () {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.DELETE_NOTEBOOK,
      note: note
    });
  }
};

module.exports = NotebookActions;
