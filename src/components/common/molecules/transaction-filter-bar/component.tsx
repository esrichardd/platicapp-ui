'use client'

import { useTransactionFiltersData } from '@/lib/hooks/transactions/use-transaction-filters-data'
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

  const { categoryOptions, accountOptions, statusOptions, isLoading } =
    useTransactionFiltersData()

  if (isLoading) {
    return (
      <div className='flex flex-wrap gap-2'>
        <div className='h-8 w-[180px] animate-pulse bg-muted rounded-md' />
        <div className='h-8 w-[180px] animate-pulse bg-muted rounded-md' />
        <div className='h-8 w-[180px] animate-pulse bg-muted rounded-md' />
        <div className='h-8 w-[180px] animate-pulse bg-muted rounded-md' />
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <CategoryFilter
        value={selectedCategory}
        onChange={(val) => onFilterChange({ selectedCategory: val })}
        categories={categoryOptions}
      />

      <AccountFilter
        value={selectedAccount}
        onChange={(val) => onFilterChange({ selectedAccount: val })}
        accounts={accountOptions}
      />

      <StatusFilter
        value={selectedStatus}
        onChange={(val) => onFilterChange({ selectedStatus: val })}
        statuses={statusOptions}
      />

      <DateRangeFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        onChange={(range) => onFilterChange(range)}
      />
    </div>
  )
}
