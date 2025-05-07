'use client'

import type { PaginationState } from '@/lib/sdk-types'
import { PaginationControls } from '@/components/common/molecules'

type IncomesPaginationProps = {
  pagination: PaginationState & { totalPages: number }
  setPagination: (pagination: Partial<PaginationState>) => void
  totalItems: number
}

export function IncomesPagination({
  pagination,
  setPagination,
  totalItems,
}: IncomesPaginationProps) {
  return (
    <PaginationControls
      pagination={{
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        entriesPerPage: pagination.entriesPerPage,
        totalItems,
      }}
      onChangePage={(page) => setPagination({ currentPage: page })}
      onChangeEntriesPerPage={(value) =>
        setPagination({ entriesPerPage: value })
      }
    />
  )
}
