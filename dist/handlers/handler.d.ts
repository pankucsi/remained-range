import { NumberRange } from '../models/range';
export interface Handler {
    setNext(handler: Handler): Handler;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare abstract class AbstractHandler implements Handler {
    private nextHandler;
    abstract isSuitable(range: NumberRange, range2: NumberRange): boolean;
    setNext(handler: Handler): Handler;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class SameRangeHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class StartWithItHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class EndWithItHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class BetweenRangeHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class FullOverlapingHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class EndOverloadHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class StartOverloadHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
export declare class NotOverlapingHandler extends AbstractHandler {
    isSuitable(range: NumberRange, range2: NumberRange): boolean;
    handle(range: NumberRange, range2: NumberRange): NumberRange[];
}
//# sourceMappingURL=handler.d.ts.map