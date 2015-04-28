var moment = require('moment');

const KEY_ARROW_DOWN = 40;
const KEY_ARROW_UP = 38;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;
const KEY_RETURN = 13;
const KEY_ESC = 27;

function onlyCallIfValuePropPassed(fun) {
  return function(props) {
    if (props.value) {
      fun(props);
    }
  }
}

/**
 * We use CalendarGridKeyBindings to represent the keyDown event behavior for
 * components related to the <CalendarGrid> component in `react-pick-datetime`.
 *
 * Theres a few key properties we expext to find in props:
 *
 *    - `value`
 *    - `onChange`
 *    - `onComplete`
 *    - `onCancel`
 */
const CalendarGridKeyBindings = {
  getKeyBindings: function(props) {
    return {
      [KEY_ARROW_LEFT]: this.changeToPreviousDay,
      [KEY_ARROW_RIGHT]: this.changeToNextDay,
      [KEY_ARROW_UP]: this.changeToPreviousWeek,
      [KEY_ARROW_DOWN]: this.changeToNextWeek,
      [KEY_RETURN]: this.complete,
      [KEY_ESC]: props.onCancel
    };
  },

  complete: onlyCallIfValuePropPassed(function(props) {
    props.onComplete(props.value);
  }),

  changeToNextDay: onlyCallIfValuePropPassed(function(props) {
    props.onChange(moment(props.value).add(1, 'd'));
  }),

  changeToPreviousDay: onlyCallIfValuePropPassed(function(props) {
    props.onChange(moment(props.value).subtract(1, 'd'));
  }),

  changeToNextWeek: onlyCallIfValuePropPassed(function(props) {
    props.onChange(moment(props.value).add(1, 'w'));
  }),

  changeToPreviousWeek: onlyCallIfValuePropPassed(function(props) {
    props.onChange(moment(props.value).subtract(1, 'w'));
  }),

  handleKeyDown: function(props, event) {
    const binding = this.getKeyBindings(props)[event.keyCode];

    if (binding) {
      event.preventDefault();
      binding(props);
    }
  }
};

module.exports = CalendarGridKeyBindings;