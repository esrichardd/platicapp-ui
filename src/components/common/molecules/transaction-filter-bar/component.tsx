'use client'

import {
  AccountFilter,
  CategoryFilter,
  DateRangeFilter,
  StatusFilter,
} from '@/components/common/atoms'
import { TransactionFilterBarProps } from './type'

export function TransactionFilterBar({
  filters,
  onFilterChange,
}: TransactionFilterBarProps) {
  const {
    selectedAccount,
    selectedCategory,
    selectedStatus,
    dateFrom,
    dateTo,
  } = filters

  return (
    <div className='flex flex-wrap gap-2'>
      <CategoryFilter
        value={selectedCategory}
        onChange={(val) => onFilterChange({ selectedCategory: val })}
      />

      <AccountFilter
        value={selectedAccount}
        onChange={(val) => onFilterChange({ selectedAccount: val })}
      />

      <StatusFilter
        value={selectedStatus}
        onChange={(val) => onFilterChange({ selectedStatus: val })}
      />

      <DateRangeFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        onChange={(range) => onFilterChange(range)}
      />
    </div>
  )
}
