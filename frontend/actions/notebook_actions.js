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

  editNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.EDIT_NOTEBOOK,
      notebook: notebook
    });
  },

  deleteNotebook: function (notebook) {
    debugger
    AppDispatcher.dispatch({
      actionType: NotebookConstants.DELETE_NOTEBOOK,
      notebook: notebook
    });
  }
};

module.exports = NotebookActions;
