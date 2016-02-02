var React = require('react');

var Index = React.createClass({
  getInitialState: function () {
    return ({index: this.props.index});
  }

  componentDidMount: function () {
    
  },

  getIndex: function () {
    switch (this.state.index) {
      case "notes":
        return (<NotesIndex />);
        break;

      case "notebooks-notes"
        return (<)
        break;

      case "tags":
        break;

      case "reminders"
        break;
    }
  },

  render: function () {
    var index = this.getIndex();
    return (
      <div className="outer-index">
        {index}
      </div>
    )
  }
});

module.exports = Index;
