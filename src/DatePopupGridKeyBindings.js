var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var cloneWithProps = require('react/lib/cloneWithProps');
var moment = require('moment');

const KEY_ARROW_DOWN = 40;
const KEY_ARROW_UP = 38;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;
const KEY_RETURN = 13;
const KEY_ESC = 27;

var DatePopupGridKeyBindings = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      value: null
    };
  },

  getKeyBindings: function() {
    var {onChange, onComplete, onCancel, value} = this.props;

    return {
      [KEY_ARROW_LEFT]: () => value && onChange(moment(value).subtract(1, 'd')),
      [KEY_ARROW_RIGHT]: () => value && onChange(moment(value).add(1, 'd')),
      [KEY_ARROW_UP]: () => value && onChange(moment(value).subtract(1, 'w')),
      [KEY_ARROW_DOWN]: () => value && onChange(moment(value).add(1, 'w')),
      [KEY_RETURN]: () => value && onComplete(value),
      [KEY_ESC]: () => onCancel()
    };
  },

  handleKeyDown: function(event) {
    var binding = this.getKeyBindings()[event.keyCode];
    if (binding) {
      event.preventDefault();
      binding();
    }
  },

  render: function() {
    return cloneWithProps(React.Children.only(this.props.children), {
      onKeyDown: this.handleKeyDown
    });
  }

});

module.exports = DatePopupGridKeyBindings;