export interface Range<T> {
  start: T
  end: T
}

export interface DateRange extends Range<Date> {}

export interface NumberRange extends Range<number> {}
