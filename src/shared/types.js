// @flow

export type DateT = {
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  closeAdj: Number,
  vol: Number,
  dividend: Number,
  end: Number,
};

export type StockT = {
  sym: string,
  lastRefreshed: Date,
  dates: DateT[],
};
