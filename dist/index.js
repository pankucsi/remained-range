"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handler_1 = require("./handlers/handler");
exports.remainedRange = function (rawRange, rawRange2) {
    var isDateRange = rawRange.start instanceof Date && rawRange.end instanceof Date;
    // if add more type, then refactor it
    var range = isDateRange
        ? convertDateRangeToNumberRange(rawRange)
        : rawRange;
    var range2 = isDateRange
        ? convertDateRangeToNumberRange(rawRange2)
        : rawRange2;
    var remainedRanges = calculateRemainedRange(range, range2);
    // if add more type, then refactor it
    return isDateRange
        ? remainedRanges.map(function (remainedRange) { return convertNumberRangeToDateRange(remainedRange); })
        : remainedRanges;
};
var convertDateRangeToNumberRange = function (range) { return ({
    end: range.end.getTime(),
    start: range.start.getTime(),
}); };
var convertNumberRangeToDateRange = function (range) { return ({
    end: new Date(range.end),
    start: new Date(range.start),
}); };
var calculateRemainedRange = function (range, range2) {
    var sameRange = new handler_1.SameRangeHandler();
    var startWithIt = new handler_1.StartWithItHandler();
    var endWithIt = new handler_1.EndWithItHandler();
    var betweenRange = new handler_1.BetweenRangeHandler();
    var fullOverlaping = new handler_1.FullOverlapingHandler();
    var endOverload = new handler_1.EndOverloadHandler();
    var startOverload = new handler_1.StartOverloadHandler();
    var notOverlaping = new handler_1.NotOverlapingHandler();
    sameRange
        .setNext(new handler_1.StartWithItHandler())
        .setNext(new handler_1.EndWithItHandler())
        .setNext(new handler_1.BetweenRangeHandler())
        .setNext(new handler_1.FullOverlapingHandler())
        .setNext(new handler_1.EndOverloadHandler())
        .setNext(new handler_1.StartOverloadHandler())
        .setNext(new handler_1.NotOverlapingHandler());
    return sameRange.handle(range, range2);
};
