var React = require('react');
var SearchApiUtil = require('../util/search_api_util');
var SearchResultsStore = require('../stores/search_results_store');
var NoteIndexItem = require('./notes/index_item');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Search = React.createClass({

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

  render: function () {

    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      if (searchResult._type === "Note") {
        return <div className="search-result"><div>Note: {searchResult.title}</div></div>;
      } else if (searchResult._type === "Notebook") {
        return <div className="search-result"><div>Notebook: {searchResult.title}</div></div>;
      }
    });

    return (
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="search notes"
          onKeyUp={this.search} />
        <div className="search-location">searching in your notebooks</div>
        <ul className="search-results-list">
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = Search;
