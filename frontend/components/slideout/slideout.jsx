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
    this.setState({index: newProps.index, isOpen: newProps.isOpen});
    newProps.isOpen ? $('.slideout').show('slow') : $('.slideout').hide('slow');
  },

  setUpIndex: function () {
    switch (this.state.index) {
      case "notebooks":
        return <NotebookIndex />;
      case "tags":
        return <TagsIndex />;
    }
    return null;
  },

  render: function () {
    var index = this.setUpIndex();

    return (
      <div className="slideout">
        {index}
      </div>
    );
  }
});

module.exports = SlideOut;
