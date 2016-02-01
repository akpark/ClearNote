var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var Search = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ({searchInput: ""});
  },

  handleKeyDown: function (e) {
    if (e.keyCode === 13) {
      //perform search
    }
  }

  render: function () {
    return (
      <div className="search">
        <input
          type="text"
          placeholder="search notes"
          onKeyDown={this.handleKeyDown}
          valueLink={this.linkState('search-input')}
        />
      </div>
    )
  }
});

module.exports = Search;
