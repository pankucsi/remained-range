import { NumberRange } from '../models/range'

export interface Handler {
  setNext(handler: Handler): Handler

  handle(range: NumberRange, range2: NumberRange): NumberRange[]
}

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler

  public abstract isSuitable(range: NumberRange, range2: NumberRange): boolean

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    if (this.nextHandler) {
      return this.nextHandler.handle(range, range2)
    }
    return null
  }
}

const between = (x, min, max) => {
  return x >= min && x <= max
}

export class SameRangeHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    return range.start === range2.start && range.end === range2.end
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2) ? [] : super.handle(range, range2)
  }
}

export class StartWithItHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    return range.start === range2.start && between(range2.end, range.start, range.end) 
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2)
      ? [
          {
            start: range2.end,
            end: range.end,
          },
        ]
      : super.handle(range, range2)
  }
}

export class EndWithItHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    return between(range2.start, range.start, range.end) && range.end === range2.end
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2)
      ? [
          {
            start: range.start,
            end: range2.start,
          },
        ]
      : super.handle(range, range2)
  }
}

export class BetweenRangeHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    return (
      between(range2.end, range.start, range.end) && between(range2.start, range.start, range.end)
    )
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
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
      : super.handle(range, range2)
  }
}

export class FullOverlapingHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    return range2.start <= range.start && range2.end >= range.end
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2) ? [] : super.handle(range, range2)
  }
}

export class EndOverloadHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    const isStartOverloaded =
      between(range2.end, range.start, range.end) && !between(range2.start, range.start, range.end)

    const isEndOverloaded =
      !between(range2.end, range.start, range.end) && between(range2.start, range.start, range.end)

    return !isStartOverloaded && isEndOverloaded
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2)
      ? [
          {
            start: range.start,
            end: range2.start,
          },
        ]
      : super.handle(range, range2)
  }
}

export class StartOverloadHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    const isStartOverloaded =
      between(range2.end, range.start, range.end) && !between(range2.start, range.start, range.end)

    const isEndOverloaded =
      !between(range2.end, range.start, range.end) && between(range2.start, range.start, range.end)

    return isStartOverloaded && !isEndOverloaded
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2)
      ? [
          {
            start: range2.end,
            end: range.end,
          },
        ]
      : super.handle(range, range2)
  }
}

export class NotOverlapingHandler extends AbstractHandler {
  public isSuitable(range: NumberRange, range2: NumberRange): boolean {
    return (
      !between(range2.end, range.start, range.end) && !between(range2.start, range.start, range.end)
    )
  }

  public handle(range: NumberRange, range2: NumberRange): NumberRange[] {
    return this.isSuitable(range, range2)
      ? [
          {
            start: range.start,
            end: range.end,
          },
        ]
      : super.handle(range, range2)
  }
}
