var React = require('react');

var OptionsDropdown = React.createClass({
  render: function() {
    return (
      <div className="options-dropdown">
        <div className="sort-options">
          <div className="sort-by-title">SORT BY</div>
          <div className="sort-by-option">Date Created (oldest first)</div>
          <div className="sort-by-option">Date Created (newest first)</div>
          <div className="sort-by-option">Date Updated (oldest first)</div>
          <div className="sort-by-option">Date Updated (newest first)</div>
          <div className="sort-by-option">Title (ascending)</div>
          <div className="sort-by-option">Title (descending)</div>
        </div>

        <div className="view-options">
          <div className="view-options-title">VIEW OPTIONS</div>
          <div className="view-option">Show Images</div>
          <div className="view-option">Show Text</div>
        </div>
      </div>
    );
  }
});

module.exports = OptionsDropdown;
