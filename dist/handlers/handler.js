"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
    }
    AbstractHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    AbstractHandler.prototype.handle = function (range, range2) {
        if (this.nextHandler) {
            return this.nextHandler.handle(range, range2);
        }
        return null;
    };
    return AbstractHandler;
}());
exports.AbstractHandler = AbstractHandler;
var between = function (x, min, max) {
    return x >= min && x <= max;
};
var SameRangeHandler = /** @class */ (function (_super) {
    __extends(SameRangeHandler, _super);
    function SameRangeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SameRangeHandler.prototype.isSuitable = function (range, range2) {
        return range.start === range2.start && range.end === range2.end;
    };
    SameRangeHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2) ? [] : _super.prototype.handle.call(this, range, range2);
    };
    return SameRangeHandler;
}(AbstractHandler));
exports.SameRangeHandler = SameRangeHandler;
var StartWithItHandler = /** @class */ (function (_super) {
    __extends(StartWithItHandler, _super);
    function StartWithItHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartWithItHandler.prototype.isSuitable = function (range, range2) {
        return range.start === range2.start && between(range2.end, range.start, range.end);
    };
    StartWithItHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2)
            ? [
                {
                    start: range2.end,
                    end: range.end,
                },
            ]
            : _super.prototype.handle.call(this, range, range2);
    };
    return StartWithItHandler;
}(AbstractHandler));
exports.StartWithItHandler = StartWithItHandler;
var EndWithItHandler = /** @class */ (function (_super) {
    __extends(EndWithItHandler, _super);
    function EndWithItHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndWithItHandler.prototype.isSuitable = function (range, range2) {
        return between(range2.start, range.start, range.end) && range.end === range2.end;
    };
    EndWithItHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2)
            ? [
                {
                    start: range.start,
                    end: range2.start,
                },
            ]
            : _super.prototype.handle.call(this, range, range2);
    };
    return EndWithItHandler;
}(AbstractHandler));
exports.EndWithItHandler = EndWithItHandler;
var BetweenRangeHandler = /** @class */ (function (_super) {
    __extends(BetweenRangeHandler, _super);
    function BetweenRangeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BetweenRangeHandler.prototype.isSuitable = function (range, range2) {
        return (between(range2.end, range.start, range.end) && between(range2.start, range.start, range.end));
    };
    BetweenRangeHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2)
            ? [
                {
                    start: range.start,
                    end: range2.start,
                },
                {
                    start: range2.end,
                    end: range.end,
                },
            ]
            : _super.prototype.handle.call(this, range, range2);
    };
    return BetweenRangeHandler;
}(AbstractHandler));
exports.BetweenRangeHandler = BetweenRangeHandler;
var FullOverlapingHandler = /** @class */ (function (_super) {
    __extends(FullOverlapingHandler, _super);
    function FullOverlapingHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullOverlapingHandler.prototype.isSuitable = function (range, range2) {
        return range2.start <= range.start && range2.end >= range.end;
    };
    FullOverlapingHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2) ? [] : _super.prototype.handle.call(this, range, range2);
    };
    return FullOverlapingHandler;
}(AbstractHandler));
exports.FullOverlapingHandler = FullOverlapingHandler;
var EndOverloadHandler = /** @class */ (function (_super) {
    __extends(EndOverloadHandler, _super);
    function EndOverloadHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndOverloadHandler.prototype.isSuitable = function (range, range2) {
        var isStartOverloaded = between(range2.end, range.start, range.end) && !between(range2.start, range.start, range.end);
        var isEndOverloaded = !between(range2.end, range.start, range.end) && between(range2.start, range.start, range.end);
        return !isStartOverloaded && isEndOverloaded;
    };
    EndOverloadHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2)
            ? [
                {
                    start: range.start,
                    end: range2.start,
                },
            ]
            : _super.prototype.handle.call(this, range, range2);
    };
    return EndOverloadHandler;
}(AbstractHandler));
exports.EndOverloadHandler = EndOverloadHandler;
var StartOverloadHandler = /** @class */ (function (_super) {
    __extends(StartOverloadHandler, _super);
    function StartOverloadHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartOverloadHandler.prototype.isSuitable = function (range, range2) {
        var isStartOverloaded = between(range2.end, range.start, range.end) && !between(range2.start, range.start, range.end);
        var isEndOverloaded = !between(range2.end, range.start, range.end) && between(range2.start, range.start, range.end);
        return isStartOverloaded && !isEndOverloaded;
    };
    StartOverloadHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2)
            ? [
                {
                    start: range2.end,
                    end: range.end,
                },
            ]
            : _super.prototype.handle.call(this, range, range2);
    };
    return StartOverloadHandler;
}(AbstractHandler));
exports.StartOverloadHandler = StartOverloadHandler;
var NotOverlapingHandler = /** @class */ (function (_super) {
    __extends(NotOverlapingHandler, _super);
    function NotOverlapingHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotOverlapingHandler.prototype.isSuitable = function (range, range2) {
        return (!between(range2.end, range.start, range.end) && !between(range2.start, range.start, range.end));
    };
    NotOverlapingHandler.prototype.handle = function (range, range2) {
        return this.isSuitable(range, range2)
            ? [
                {
                    start: range.start,
                    end: range.end,
                },
            ]
            : _super.prototype.handle.call(this, range, range2);
    };
    return NotOverlapingHandler;
}(AbstractHandler));
exports.NotOverlapingHandler = NotOverlapingHandler;
