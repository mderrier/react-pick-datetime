var CalendarGridBody = require('./CalendarGridBody');
var CalendarGridHeader = require('./CalendarGridHeader')
var CalendarGridKeyBindings = require('./CalendarGridKeyBindings');;
var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var getUniqueId = require('react-pick/lib/helpers/getUniqueId');

var CalendarGrid = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    month: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      value: null
    };
  },

  getInitialState: function() {
    return {
      id: getUniqueId('CalendarGrid')
    };
  },

  getDescendantIdForDay: function(day) {
    return day && `${this.state.id}-${day.format('DDD')}`;
  },

  handleKeyDown: function(event) {
    CalendarGridKeyBindings.handleKeyDown(this.props, event);
  },

  render: function() {
    var {
      month, 
      value, 
      onComplete,
      ...otherProps
    } = this.props;

    return (
      <table
        {...otherProps}
        aria-activedescendant={this.getDescendantIdForDay(value)}
        className="CalendarGrid"
        role="grid"
        onKeyDown={this.handleKeyDown}>
        <CalendarGridHeader month={month} />
        <CalendarGridBody 
          {...{month, value, onComplete}}
          getDescendantIdForDay={this.getDescendantIdForDay}
        />
      </table>
    );
  }

});

module.exports = CalendarGrid;