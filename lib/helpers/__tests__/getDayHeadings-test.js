"use strict";

var expect = require("expect");
var getDayHeadings = require("../getDayHeadings");
var moment = require("moment");

describe("getDayHeadings", function () {
  it("should work with locales", function () {
    expect(getDayHeadings(moment("2015-04-10").locale("en"))).toEqual([{ abbr: "Su", title: "Sunday" }, { abbr: "Mo", title: "Monday" }, { abbr: "Tu", title: "Tuesday" }, { abbr: "We", title: "Wednesday" }, { abbr: "Th", title: "Thursday" }, { abbr: "Fr", title: "Friday" }, { abbr: "Sa", title: "Saturday" }]);

    expect(getDayHeadings(moment("2015-04-10").locale("fr"))).toEqual([{ abbr: "Lu", title: "lundi" }, { abbr: "Ma", title: "mardi" }, { abbr: "Me", title: "mercredi" }, { abbr: "Je", title: "jeudi" }, { abbr: "Ve", title: "vendredi" }, { abbr: "Sa", title: "samedi" }, { abbr: "Di", title: "dimanche" }]);
  });
});