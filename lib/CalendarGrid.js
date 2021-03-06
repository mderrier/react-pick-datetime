"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var CalendarGridBody = require("./CalendarGridBody");
var CalendarGridHeader = require("./CalendarGridHeader");
var CalendarGridKeyBindings = require("./CalendarGridKeyBindings");;
var React = require("react");

var PureRenderMixin = require("react-addons-pure-render-mixin");

var getDayHeadings = require("./helpers/getDayHeadings");
var getDays = require("./helpers/getDays");
var getUniqueId = require("react-pick-2/lib/helpers/getUniqueId");

var CalendarGrid = React.createClass({
  displayName: "CalendarGrid",

  mixins: [PureRenderMixin],

  propTypes: {
    month: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    value: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      id: getUniqueId("CalendarGrid")
    };
  },

  getDescendantIdForDay: function getDescendantIdForDay(day) {
    return day && "" + this.state.id + "-" + day.format("DDD");
  },

  handleKeyDown: function handleKeyDown(event) {
    CalendarGridKeyBindings.handleKeyDown(this.props, event);
  },

  render: function render() {
    var _props = this.props;
    var month = _props.month;
    var value = _props.value;
    var onComplete = _props.onComplete;

    var otherProps = _objectWithoutProperties(_props, ["month", "value", "onComplete"]);

    return React.createElement(
      "table",
      _extends({}, otherProps, {
        "aria-activedescendant": this.getDescendantIdForDay(value),
        className: "CalendarGrid",
        role: "grid",
        onKeyDown: this.handleKeyDown }),
      React.createElement(CalendarGridHeader, { headings: getDayHeadings(month) }),
      React.createElement(CalendarGridBody, {
        onComplete: onComplete,
        days: getDays(month, value),
        getDescendantIdForDay: this.getDescendantIdForDay
      })
    );
  }

});

module.exports = CalendarGrid;