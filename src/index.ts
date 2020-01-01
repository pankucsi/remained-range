import {
  BetweenRangeHandler,
  EndOverloadHandler,
  EndWithItHandler,
  FullOverlapingHandler,
  NotOverlapingHandler,
  SameRangeHandler,
  StartOverloadHandler,
  StartWithItHandler,
} from './handlers/handler'
import { DateRange, NumberRange, Range } from './models/range'

export const remainedRange = (rawRange: Range<any>, rawRange2: Range<any>): any[] => {
  const isDateRange = rawRange.start instanceof Date && rawRange.end instanceof Date

  // if add more type, then refactor it
  const range: NumberRange = isDateRange
    ? convertDateRangeToNumberRange(rawRange)
    : (rawRange as NumberRange)
  const range2: NumberRange = isDateRange
    ? convertDateRangeToNumberRange(rawRange2)
    : (rawRange2 as NumberRange)

  const remainedRanges: NumberRange[] = calculateRemainedRange(range, range2)

  // if add more type, then refactor it
  return isDateRange
    ? remainedRanges.map(remainedRange => convertNumberRangeToDateRange(remainedRange))
    : remainedRanges
}

const convertDateRangeToNumberRange = (range: DateRange): NumberRange => ({
  end: range.end.getTime(),
  start: range.start.getTime(),
})

const convertNumberRangeToDateRange = (range: NumberRange): DateRange => ({
  end: new Date(range.end),
  start: new Date(range.start),
})

const calculateRemainedRange = (range: NumberRange, range2: NumberRange): NumberRange[] => {
  const sameRange = new SameRangeHandler()
  const startWithIt = new StartWithItHandler()
  const endWithIt = new EndWithItHandler()
  const betweenRange = new BetweenRangeHandler()
  const fullOverlaping = new FullOverlapingHandler()
  const endOverload = new EndOverloadHandler()
  const startOverload = new StartOverloadHandler()
  const notOverlaping = new NotOverlapingHandler()

  sameRange
    .setNext(new StartWithItHandler())
    .setNext(new EndWithItHandler())
    .setNext(new BetweenRangeHandler())
    .setNext(new FullOverlapingHandler())
    .setNext(new EndOverloadHandler())
    .setNext(new StartOverloadHandler())
    .setNext(new NotOverlapingHandler())

  return sameRange.handle(range, range2)
}
