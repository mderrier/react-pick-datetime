var DatePopupGridBody = require('./DatePopupGridBody');
var DatePopupGridHeader = require('./DatePopupGridHeader')
var DatePopupGridKeyBindings = require('./DatePopupGridKeyBindings');;
var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var getUniqueId = require('react-pick/lib/helpers/getUniqueId');
var moment = require('moment');

var DatePopupGrid = React.createClass({

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
      id: getUniqueId('DatePopupGrid')
    };
  },

  getDescendantIdForDay: function(day) {
    return day && `${this.state.id}-${day.format('DDD')}`;
  },

  render: function() {
    var {
      month, 
      value, 
      onComplete,
      onChange, 
      onCancel, 
      ...otherProps
    } = this.props;

    return (
      <DatePopupGridKeyBindings {...{value, onChange, onComplete, onCancel}}>
        <table
          {...otherProps}
          className="DatePopupGrid"
          aria-activedescendant={this.getDescendantIdForDay(this.props.value)}
          role="grid">
          <DatePopupGridHeader month={this.props.month} />
          <DatePopupGridBody 
            {...{month, value, onComplete}}
            getDescendantIdForDay={this.getDescendantIdForDay}
          />
        </table>
      </DatePopupGridKeyBindings>
    );
  }

});

module.exports = DatePopupGrid;