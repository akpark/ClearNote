var React = require('react');
var SearchApiUtil = require('../util/search_api_util');
var SearchResultsStore = require('../stores/search_results_store');
var NoteIndexItem = require('./notes/index_item');
var NotebookIndexItem = require('./slideout/notebooks/index_item');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var Search = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({page: 1, query: ""});
  },

  componentDidMount: function () {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _onChange: function () {
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query});
  },

  handleNoteClick: function (e) {
    var note = e.target.value;
    this.history.pushState(null, '/home/notes/' + note.id);
  },

  handleNotebookClick: function (e) {
    var notebook = e.target.value;
    this.history.pushState(null, '/home/notes', { header: "notebooks", title: notebook.title, id: notebook.id })
  },

  render: function () {

    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      if (searchResult._type === "Note") {
        return <NoteIndexItem note={searchResult} />
        // return <div className="search-result" value={searchResult} onClick={this.handleNoteClick}><div>Note: {searchResult.title}</div></div>;
      } else if (searchResult._type === "Notebook") {
        return <div className="search-result" value={searchResult} onClick={this.handleNotebookClick}><div>Notebook: {searchResult.title}</div></div>;
      }
    });

    return (
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="search notes.."
          onKeyUp={this.search} />
        <div className="search-location">Searching in your notebooks...</div>
        <ul className="search-results-list">
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = Search;
