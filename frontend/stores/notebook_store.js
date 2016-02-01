var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var NotebookStore = new Store(AppDispatcher);
var NotebookConstants = require('../constants/notebook_constants');
var _notebooks = {};

NotebookStore.all = function () {
  // return _notebooks.slice(0);
  var notebooks = [];
  for (var id in _notebooks) {
    notebooks.push(_notebooks[id]);
  }
  return notebooks;
};

NotebookStore.find = function (id) {
  // _notebooks.forEach(function (notebook) {
  //   if (notebook.id === id) {
  //     return notebook;
  //   }
  // })
  return _notebooks[id];
};

function resetNotebooks(notebooks) {
  _notebooks = {};
  notebooks.forEach(function (notebook) {
    _notebooks[notebook.id] = notebook;
  });
  // _notebooks = notebooks.slice(0);
};

function resetNotebook(notebook) {
  // _notebooks.forEach(function (notebook) {
  //   if (newNotebook.id === notebook.id) {
  //     var index = _notebooks.indexOf(notebook);
  //     _notebooks[index] = newNotebook;
  //   }
  // })
  _notebooks[notebook.id] = notebook;
};

function deleteNotebook(notebook) {
  // _notebooks.forEach(function (notebook) {
  //   if (notebook.id === deleteNotebook.id) {
  //     var index = _notebooks.indexOf(notebook);
  //     _notebooks.splice(index, 1);
  //   }
  // })
  // debugger
  var notebookId = notebook.id;
  delete _notebooks[notebookId];
  // debugger
};

NotebookStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case NotebookConstants.NOTEBOOKS_RECEIVED:
      resetNotebooks(payload.notebooks);
      this.__emitChange();
      break;

    case NotebookConstants.NOTEBOOK_RECEIVED:
      resetNotebook(payload.notebook);
      this.__emitChange();
      break;

    // case NotebookConstants.CREATE_NOTEBOOK:
    //   addNotebook(payload.notebook);
    //   this.__emitChange();
    //   break;

    case NotebookConstants.DELETE_NOTEBOOK:
      deleteNotebook(payload.notebook);
      this.__emitChange();
      break;
  }
}

module.exports = NotebookStore;
window.NotebookStore = NotebookStore;

//allow the index of notebooks receive the call first before changing the index item
