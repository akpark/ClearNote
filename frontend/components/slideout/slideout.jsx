var React = require('react');
var NotesIndex = require('./notebooks/index');
var Modal = require('react-modal');

const customStyles = {
  content: {
    top: '0%',
    left: '10%',
  }
}
var SlideOut = React.createClass({
  getInitialState: function () {
    return ({modalIsOpen: false});
  },

  openModal: function () {
    this.setState({modalIsOpen: true});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
  },

  componentDidMount: function () {
    // $('.notebooks-index-link').on('click', function() {
    //   this.openModal();
    // }.bind(this));

  },

  setUpIndex: function () {
    switch (this.props.index) {
      case "notebooks":
        return <NotesIndex />
        break;
    }
    return <div></div>;
  },

  render: function () {
    //depending on what the user asks for
    var index = this.setUpIndex();

    return (
      <div className="slideout">
        {index}
      </div>
    )
  }
});

module.exports = SlideOut;
