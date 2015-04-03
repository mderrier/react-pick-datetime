var React = require('react');

var joinClasses = require('react/lib/joinClasses');

var DateInputButton = React.createClass({

  render: function() {
    var {className, ...otherProps} = this.props;

    return (
      <span
        {...otherProps}
        role="button"
        className={joinClasses('DateInputButton', className)}>
        📅
      </span>
    );
  }

});

module.exports = DateInputButton;