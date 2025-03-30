export type DateRangeFilterProps = {
  dateFrom?: Date
  dateTo?: Date
  onChange: (range: { dateFrom?: Date; dateTo?: Date }) => void
}
