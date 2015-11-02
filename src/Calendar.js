var CalendarGrid = require('./CalendarGrid');
var CalendarHeader = require('./CalendarHeader');
var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var joinClasses = require('fbjs/lib/joinClasses');
var getUniqueId = require('react-pick/lib/helpers/getUniqueId');

var Calendar = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    month: React.PropTypes.object.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      value: null
    };
  },

  getInitialState: function() {
    return {
      id: getUniqueId('Calendar')
    };
  },

  getHeadingId: function() {
    return `${this.state.id}-heading`;
  },

  focusOnGrid: function() {
    this.refs['grid'].getDOMNode().focus();
  },

  render: function() {
    var {
      buttonComponent,
      className,
      month,
      value,
      onMonthChange,
      onChange,
      onComplete,
      onCancel,
      ...otherProps
    } = this.props;

    return (
      <div {...otherProps} className={joinClasses('Calendar', className)}>
        <CalendarHeader
          {...{month, onMonthChange, buttonComponent}}
          getHeadingId={this.getHeadingId}
        />
        <CalendarGrid
          {...{month, value, onChange, onComplete, onCancel}}
          ref="grid"
          aria-labelledby={this.getHeadingId()}
          tabIndex="0"
        />
      </div>
    );
  }

});

module.exports = Calendar;
