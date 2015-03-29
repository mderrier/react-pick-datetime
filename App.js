var React = require('react');
var TimeCombobox = require('../src/TimeCombobox');

require('react-pick/lib/styles.css');

var App = React.createClass({

  getInitialState: function() {
    return {
      value: {inputValue: '', selectedValue: null}
    };
  },

  handleChange: function(newValue) {
    this.setState({value: newValue});
  },

  render: function() {
    var {selectedValue} = this.state.value;

    return (
      <div>
        <h1>react-pick-datetime</h1>
        <p>Selected Time: {selectedValue && selectedValue.value.format()}</p>
        <TimeCombobox 
          placeholder="Type a time..."
          value={this.state.value} 
          onChange={this.handleChange}
        />
      </div>
    );
  }

});

React.render(<App/>, document.body);