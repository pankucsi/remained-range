import { remainedRange } from '../src'
// I think its unnecesarry
describe('remainedRange tests with dates', () => {
  const timeManager = remainedRange

  it('1', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(9, 0), end: createDate(10, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = [
      { start: createDate(8, 0), end: createDate(9, 0) },
      { start: createDate(10, 0), end: createDate(11, 0) },
    ]

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })

  it('2', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(8, 0), end: createDate(10, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = [{ start: createDate(10, 0), end: createDate(11, 0) }]

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })

  it('3', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(10, 0), end: createDate(11, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = [{ start: createDate(8, 0), end: createDate(10, 0) }]

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })

  it('4', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(7, 0), end: createDate(10, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = [{ start: createDate(10, 0), end: createDate(11, 0) }]

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })

  it('5', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(10, 0), end: createDate(13, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = [{ start: createDate(8, 0), end: createDate(10, 0) }]

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })

  it('6', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(7, 0), end: createDate(13, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = []

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })

  it('7', () => {
    const originalEvent = { start: createDate(8, 0), end: createDate(11, 0) }
    const overlapingEvent = { start: createDate(8, 0), end: createDate(11, 0) }

    const availableEvent = timeManager(originalEvent, overlapingEvent)

    const expected = []

    expect(expected.sort()).toEqual(availableEvent.sort())
    expect(expected.length).toEqual(availableEvent.length)
  })
})

const createDate = (hour: number, minutes: number): Date => {
  const d = new Date()
  d.setHours(hour, minutes, 0, 0)
  return d
}
