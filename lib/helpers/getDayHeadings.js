"use strict";

var moment = require("moment");

function getDayHeadings(month) {
  var endDay = moment(month).endOf("week");
  var currentDay = moment(month).startOf("week");
  var headings = [];

  while (!currentDay.isAfter(endDay)) {
    headings.push({
      abbr: currentDay.format("dd"),
      title: currentDay.format("dddd")
    });

    currentDay.add(1, "days");
  }

  return headings;
}

module.exports = getDayHeadings;