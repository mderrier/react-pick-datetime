"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Calendar = require("./Calendar");
var CalendarToggleButton = require("./CalendarToggleButton");
var DateInput = require("./DateInput");
var React = require("react");

var _require = require("react-pick-2");

var InputWithPopup = _require.InputWithPopup;
var PureRenderMixin = require("react-addons-pure-render-mixin");

var moment = require("moment");
var emptyFunction = require("react-pick-2/lib/helpers/emptyFunction");

var DateInput = React.createClass({
  displayName: "DateInput",

  mixins: [PureRenderMixin],

  propTypes: {
    /**
     * Event handler fired when the value of the `<DateInput>` changes.
     * The called function is passed `value`.
     */
    onChange: React.PropTypes.func.isRequired,

    /**
     * The current value of the `<DateInput>`, as a `moment` date.
     */
    value: React.PropTypes.object,

    /**
     * Event handler fired when a new non-null value is selected and the 
     * popup closed. The called function is passed `value`.
     */
    onComplete: React.PropTypes.func,

    /**
     * The format of the date shown and parsed in the `<input> box.
     * Default is `'l'`.
     */
    inputValueFormat: React.PropTypes.string,

    /**
     * The component to render for the calendar in the popup.
     * Default is `Calendar`.
     */
    calendarComponent: React.PropTypes.func,

    /**
     * The component to render for the toggle button next to the input box.
     * Setting this to `null` hides the toggle button entirely.
     * Default is `CalendarToggleButton`.
     */
    calendarToggleButtonComponent: React.PropTypes.func,

    /**
     * The locale to be used for the format of the date. If you absolutely need 
     * to override the locale for some reason, use this.
     * Default is the browser's `window.navigator.language` value.
     */
    locale: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      inputValueFormat: "l",
      onComplete: emptyFunction,
      inputComponent: "input",
      calendarComponent: Calendar,
      calendarToggleButtonComponent: CalendarToggleButton,
      locale: window.navigator.userLanguage || window.navigator.language
    };
  },

  getInitialState: function getInitialState() {
    var _props = this.props;
    var value = _props.value;
    var locale = _props.locale;
    var inputValueFormat = _props.inputValueFormat;

    return {
      isOpen: false,
      popupMonth: value || moment().locale(locale),
      inputValue: value !== null ? value.format(inputValueFormat) : null
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && nextProps.value !== null) {
      this.setState({
        inputValue: nextProps.value.format(nextProps.inputValueFormat),
        popupMonth: nextProps.value
      });
    }
  },

  handlePopupMonthChange: function handlePopupMonthChange(popupMonth) {
    this.setState({ popupMonth: popupMonth });
  },

  handlePopupChange: function handlePopupChange(value) {
    this.props.onChange(value);
  },

  handlePopupComplete: function handlePopupComplete(value) {
    this.setState({ isOpen: false });
    this.props.onChange(value);
    this.props.onComplete(value);
  },

  handlePopupCancel: function handlePopupCancel() {
    this.setState({ isOpen: false });
  },

  handleInputChange: function handleInputChange(event) {
    var inputValue = event.target.value;
    var _props = this.props;
    var locale = _props.locale;
    var inputValueFormat = _props.inputValueFormat;

    this.setState({ inputValue: inputValue });

    var parsedInputValue = moment(inputValue, inputValueFormat, locale, true);
    if (parsedInputValue.isValid()) {
      this.setState({ popupMonth: parsedInputValue });
      this.props.onChange(parsedInputValue);
    } else {
      this.props.onChange(null);
    }
  },

  handleClick: function handleClick() {
    var _this = this;

    this.setState({ isOpen: !this.state.isOpen }, function () {
      _this.state.isOpen && _this.refs.popup.focusOnGrid();
    });
  },

  render: function render() {
    var CalendarComponent = this.props.calendarComponent;
    var CalendarToggleButtonComponent = this.props.calendarToggleButtonComponent;
    var _props = this.props;
    var buttonComponent = _props.buttonComponent;
    var value = _props.value;

    var otherProps = _objectWithoutProperties(_props, ["buttonComponent", "value"]);

    return React.createElement(
      "div",
      { className: "DateInput" },
      React.createElement(
        InputWithPopup,
        _extends({}, otherProps, {
          isOpen: this.state.isOpen,
          value: this.state.inputValue,
          onFocus: this.handleInputFocus,
          onBlur: this.handleInputBlur,
          onChange: this.handleInputChange,
          onClick: this.handleClick }),
        React.createElement(CalendarComponent, {
          buttonComponent: buttonComponent,
          month: this.state.popupMonth,
          onCancel: this.handlePopupCancel,
          onChange: this.handlePopupChange,
          onComplete: this.handlePopupComplete,
          onMonthChange: this.handlePopupMonthChange,
          ref: "popup",
          value: value
        })
      ),
      CalendarToggleButtonComponent && React.createElement(CalendarToggleButtonComponent, {
        "aria-hidden": "true",
        onClick: this.handleClick
      })
    );
  }

});

module.exports = DateInput;