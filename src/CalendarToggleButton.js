var React = require('react');
var ComponentPropType = require('react-pick/lib/helpers/ComponentPropType');

var joinClasses = require('fbjs/lib/joinClasses');

var CalendarToggleButton = React.createClass({

  propTypes: {
    buttonComponent: ComponentPropType
  },

  getDefaultProps: function() {
    return {
      buttonComponent: 'button'
    };
  },

  render: function() {
    var ButtonComponent = this.props.buttonComponent;
    var {className, ...otherProps} = this.props;

    return (
      <ButtonComponent
        {...otherProps}
        className={joinClasses('CalendarToggleButton', className)}>
        📅
      </ButtonComponent>
    );
  }

});

module.exports = CalendarToggleButton;
