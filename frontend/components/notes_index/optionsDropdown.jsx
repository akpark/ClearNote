var React = require('react');

var OptionsDropdown = React.createClass({
  render: function() {
    return (
      <div className="options-dropdown">
        <div className="sort-options">
          <div className="sort-by-title">SORT BY</div>
          <div>Date Created (oldest first)</div>
          <div>Date Created (newest first)</div>
          <div>Date Updated (oldest first)</div>
          <div>Date Updated (newest first)</div>
          <div>Title (ascending)</div>
          <div>Title (descending)</div>
        </div>

        <div className="view-options">
          <div className="view-options-title">VIEW OPTIONS</div>
          <div>Show Images</div>
          <div>Show Text</div>
        </div>
      </div>
    );
  }
});

module.exports = OptionsDropdown;
