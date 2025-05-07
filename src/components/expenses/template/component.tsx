'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTransactionFilters } from '@/lib/hooks/transactions/use-transaction-filters'
import { TransactionInput } from '@/lib/sdk-types'
import {
  PaginationControls,
  TransactionDialog,
  TransactionFilterBar,
} from '@/components/common/molecules'
import { TransactionTable } from '@/components/common/organisms'
import { Button } from '@/components/common/ui/button'

export function ExpensesTemplate() {
  const {
    filters,
    setFilters,
    filteredData,
    paginatedData,
    pagination,
    setPagination,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    clearSelection,
  } = useTransactionFilters([])

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleBulkAction = (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: string[],
  ) => {
    alert(`${action.toUpperCase()} ${ids.length} gastos`)
    clearSelection()
  }

  const handleCreate = (newExpense: TransactionInput) => {
    alert(`Gasto creado: ${JSON.stringify(newExpense, null, 2)}`)
    // Aquí puedes guardar el gasto en backend o estado global
  }

  return (
    <main className='flex-1 p-4 sm:p-6 overflow-hidden'>
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex justify-between items-center'>
          <Button
            className='w-full sm:w-auto'
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className='mr-2 h-4 w-4' />
            Agregar Gasto
          </Button>
          <TransactionDialog
            type='EXPENSE'
            mode='create'
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            onSubmit={handleCreate}
          />
        </div>

        <TransactionFilterBar filters={filters} onFilterChange={setFilters} />

        <TransactionTable
          transactions={paginatedData}
          selectedItems={selectedItems}
          onToggleSelect={toggleSelectItem}
          onToggleSelectAll={toggleSelectAll}
          onBulkAction={handleBulkAction}
        />

        <PaginationControls
          pagination={{
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            entriesPerPage: pagination.entriesPerPage,
            totalItems: filteredData.length,
          }}
          onChangePage={(page) => setPagination({ currentPage: page })}
          onChangeEntriesPerPage={(value) =>
            setPagination({ entriesPerPage: value })
          }
        />
      </div>
    </main>
  )
}
