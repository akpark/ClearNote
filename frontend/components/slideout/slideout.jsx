var React = require('react');
var NotesIndex = require('./notebooks/index');

var SlideOut = React.createClass({
  getInitialState: function () {
    return {index: this.props.index};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({index: newProps.index});
  },

  setUpIndex: function () {
    switch (this.state.index) {
      case "notebooks":
        return <NotesIndex />
        break;
      case "tags":
        return <TagsIndex />
        break;
    }
    return null;
  },

  render: function () {
    var index = this.setUpIndex();

    return (
      <div className="slideout">
        {index}
      </div>
    )
  }
});

module.exports = SlideOut;
