var React = require('react');
var {Combobox} = require('react-pick');

var moment = require('moment');

var TimeCombobox = React.createClass({

  propTypes: {
    start: React.PropTypes.object,
    end: React.PropTypes.object,
    increment: React.PropTypes.shape({
      unit: React.PropTypes.string,
      amount: React.PropTypes.number
    })
  },

  getDefaultProps: function() {
    return {
      start: moment().startOf('day'),
      end: moment().endOf('day'),
      increment: {amount: 5, unit: 'minutes'}
    };
  },

  getOptions: function() {
    var {amount, unit} = this.props.increment;
    var time = moment(this.props.start);
    var options = [];

    while (time.isBefore(this.props.end)) {
      options.push({
        formatted: time.format('LT'), 
        value: moment(time)
      });

      time.add(amount, unit);
    }

    return options;
  },

  getOptionsForInput: function(inputValue, callback) {
    if (inputValue == '') {
      callback([])
      return;
    }

    callback(this.getOptions().filter(function ({formatted}) {
      return formatted.indexOf(inputValue) === 0;
    }))
  },

  getLabelForOption: function(option) {
    return option.formatted;
  },

  render: function() {
    return (
      <Combobox
        {...this.props}
        getLabelForOption={this.getLabelForOption}
        getOptionsForInput={this.getOptionsForInput}
        renderOption={this.getLabelForOption}
      />
    );
  }

});

module.exports = TimeCombobox;
