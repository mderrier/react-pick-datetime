var React = require('react/addons');
var {Combobox} = require('react-pick');

var {PureRenderMixin} = React.addons;

var moment = require('moment');

var TimeInput = React.createClass({

  propTypes: {
    /**
     * A `moment` object for the start of the time range to do completions for.
     * Default is the start of the current day.
     */
    start: React.PropTypes.object,

    /**
     * A `moment` object for the end of the time range to do completions for.
     * Default is the end of the current day.
     */
    end: React.PropTypes.object,

    /**
     * The amount of time between each of the autocompleted times, represented
     * as an object with two properties:
     *   - `unit`: A string with a `moment` time unit, like `minutes`.
     *   - `amount`: A number in that unit.
     * Default is 5 minutes.
     */
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

  getOptionsForInputValue: function(inputValue) {
    return new Promise((resolve, reject) => {
      if (inputValue === '') {
        resolve([]);
        return;
      }

      resolve(this.getOptions().filter(function ({formatted}) {
        return formatted.indexOf(inputValue) === 0;
      }));
    });
  },

  getLabelForOption: function(option) {
    return option.formatted;
  },

  render: function() {
    return (
      <Combobox
        {...this.props}
        getLabelForOption={this.getLabelForOption}
        getOptionsForInputValue={this.getOptionsForInputValue}
      />
    );
  }

});

module.exports = TimeInput;
