"use strict";

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var React = require("react");

var PureRenderMixin = require("react-addons-pure-render-mixin");

var CalendarGridHeader = React.createClass({
  displayName: "CalendarGridHeader",

  mixins: [PureRenderMixin],

  propTypes: {
    headings: React.PropTypes.array.isRequired
  },

  render: function render() {
    var _props = this.props;
    var headings = _props.headings;

    var otherProps = _objectWithoutProperties(_props, ["headings"]);

    return React.createElement(
      "thead",
      otherProps,
      React.createElement(
        "tr",
        null,
        headings.map(function (heading, idx) {
          return React.createElement(
            "th",
            { key: idx },
            React.createElement(
              "abbr",
              { tile: heading.title },
              heading.abbr
            )
          );
        })
      )
    );
  }

});

module.exports = CalendarGridHeader;