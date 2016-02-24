"use strict";

var expect = require("expect");
var getDays = require("../getDays");
var moment = require("moment");

describe("getDays", function () {
  it("should align weeks with the correct start days of week", function () {
    var en = moment("2015-04-10").locale("en");
    expect(getDays(en, en)[0][0].formatted).toEqual("29");

    var fr = moment("2015-04-10").locale("fr");
    expect(getDays(fr, fr)[0][0].formatted).toEqual("30");
  });
});