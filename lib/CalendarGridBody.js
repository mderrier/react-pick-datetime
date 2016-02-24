"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = require("react");

var PureRenderMixin = require("react-addons-pure-render-mixin");

var moment = require("moment");
var joinClasses = require("fbjs/lib/joinClasses");

var CalendarGridBody = React.createClass({
  displayName: "CalendarGridBody",

  mixins: [PureRenderMixin],

  propTypes: {
    getDescendantIdForDay: React.PropTypes.func.isRequired,
    days: React.PropTypes.array.isRequired,
    onComplete: React.PropTypes.func.isRequired
  },

  handleDayClick: function handleDayClick(day) {
    this.props.onComplete(day);
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var days = _props.days;

    var otherProps = _objectWithoutProperties(_props, ["days"]);

    return React.createElement(
      "tbody",
      otherProps,
      days.map(function (week, idx) {
        return React.createElement(
          "tr",
          { key: idx },
          week.map(function (day, idx) {
            return React.createElement(
              "td",
              {
                "aria-selected": day.isValue + "",
                className: joinClasses("CalendarGridBody-day", day.isToday && "CalendarGridBody-day--isToday", day.isOtherMonth && "CalendarGridBody-day--isOtherMonth", day.isValue && "CalendarGridBody-day--isValue"),
                id: _this.props.getDescendantIdForDay(day.value),
                key: idx,
                onClick: _this.handleDayClick.bind(_this, day.value),
                role: "gridcell" },
              day.formatted
            );
          })
        );
      })
    );
  }

});

module.exports = CalendarGridBody;