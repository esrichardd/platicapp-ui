'use client'

import { useTransactionsManager } from '@/lib/hooks/transactions/use-transactions-manager'
import {
  IncomesFilterBar,
  IncomesHeader,
  IncomesPagination,
  IncomesTableSection,
} from '../molecules'

export function IncomesTemplate() {
  const {
    // Filters and pagination
    filters,
    setFilters,
    filteredData,
    paginatedData,
    pagination,
    setPagination,

    // UI State
    isCreateOpen,
    setIsCreateOpen,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,

    // Actions
    handleCreate,
    handleUpdate,
    handleBulkAction,
  } = useTransactionsManager({ type: 'INCOME' })

  return (
    <main className='flex-1 p-4 sm:p-6 overflow-hidden'>
      <div className='flex flex-col gap-6 h-full'>
        <IncomesHeader
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
          selectedItems={selectedItems}
          handleBulkAction={handleBulkAction}
          handleCreate={handleCreate}
        />
        <IncomesFilterBar filters={filters} setFilters={setFilters} />
        <IncomesTableSection
          transactions={paginatedData}
          selectedItems={selectedItems}
          toggleSelectItem={toggleSelectItem}
          toggleSelectAll={toggleSelectAll}
          onEdit={handleUpdate}
          onBulkAction={handleBulkAction}
        />
        <IncomesPagination
          pagination={pagination}
          setPagination={setPagination}
          totalItems={filteredData.length}
        />
      </div>
    </main>
  )
}
