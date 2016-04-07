var React = require('react');
var SearchApiUtil = require('../util/search_api_util');
var SearchResultsStore = require('../stores/search_results_store');
var NoteIndexItem = require('./notes/index_item');
var NotebookIndexItem = require('./notebooks/index_item');
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
    var id = e.currentTarget.id;
    this.history.pushState(null, '/home/note/' + id);

    $('.notes-index').show();
    $('.search').hide();
  },

  render: function () {
    var searchResults = SearchResultsStore.all().map(function (searchResult, key) {
      if (searchResult._type === "Note") {
        return (
          <div className="search-result-note" id={searchResult.id} key={key} onClick={this.handleNoteClick}>
            <div className="search-result-title">{searchResult.title}</div>
            <div className="search-result-body">{searchResult.body}</div>
          </div>
        );
      }
    }.bind(this));

    return (
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="search notes.."
          onKeyUp={this.search} />
        <div className="search-location">Searching in your notebooks...</div>
        <ul className="search-results-list group">
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = Search;
