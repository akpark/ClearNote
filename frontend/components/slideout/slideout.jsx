var React = require('react');
var NotebookIndex = require('./notebooks/index');

var SlideOut = React.createClass({
  getInitialState: function () {
    return {index: this.props.index, isOpen: false};
  },

  componentDidMount: function () {
    $('.slideout').hide();
  },

  componentWillReceiveProps: function (newProps) {
    $('.slideout').show("slow");
    this.setState({index: newProps.index, isOpen: newProps.isOpen});
  },

  setUpIndex: function () {
    switch (this.state.index) {
      case "notebooks":
        return <NotebookIndex />
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
