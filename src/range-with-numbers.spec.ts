import { remainedRange } from '../src'

describe('remainedRange tests by Allen interval algebra', () => {
  it('X takes place before Y ', () => {
    const x = { start: 2, end: 8 }
    const y = { start: 10, end: 12 }

    const availableEvent = remainedRange(x, y)

    const expected = [{ start: 2, end: 8 }]

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })

  it('X meets Y', () => {
    const X = { start: 2, end: 8 }
    const Y = { start: 8, end: 10 }

    const availableEvent = remainedRange(X, Y)

    const expected = [{ start: 2, end: 8 }]

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })

  it('X overlaps with Y', () => {
    const X = { start: 2, end: 8 }
    const Y = { start: 6, end: 12 }

    const availableEvent = remainedRange(X, Y)

    const expected = [{ start: 2, end: 6 }]

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })

  it('X starts Y ', () => {
    const X = { start: 2, end: 8 }
    const Y = { start: 2, end: 12 }

    const availableEvent = remainedRange(X, Y)

    const expected = []

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })

  it('X during Y ', () => {
    const X = { start: 4, end: 8 }
    const Y = { start: 2, end: 12 }

    const availableEvent = remainedRange(X, Y)

    const expected = []

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })

  it('X finishes Y', () => {
    const X = { start: 4, end: 8 }
    const Y = { start: 2, end: 8 }

    const availableEvent = remainedRange(X, Y)

    const expected = []

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })

  it('X is equal to Y ', () => {
    const X = { start: 2, end: 8 }
    const Y = { start: 2, end: 8 }

    const availableEvent = remainedRange(X, Y)

    const expected = []

    expect(availableEvent.sort()).toEqual(expected.sort())
    expect(availableEvent.length).toEqual(expected.length)
  })
})
