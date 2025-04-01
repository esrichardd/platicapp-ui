'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTransactionFilters } from '@/lib/hooks/use-transaction-filters'
import { Transaction } from '@/lib/sdk-types'
import {
  PaginationControls,
  TransactionDialog,
  TransactionFilterBar,
} from '@/components/common/molecules'
import { TransactionTable } from '@/components/common/organisms'
import { Button } from '@/components/common/ui/button'
import { TRANSACTIONS_MOCK } from './constants'

export function IncomesTemplate() {
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
  } = useTransactionFilters(TRANSACTIONS_MOCK)

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleBulkAction = (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: number[],
  ) => {
    alert(`${action.toUpperCase()} ${ids.length} elementos`)
    clearSelection()
  }

  const handleCreate = (newIncome: Omit<Transaction, 'id' | 'status'>) => {
    alert(`Ingreso creado: ${JSON.stringify(newIncome, null, 2)}`)
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
            Agregar Ingreso
          </Button>

          <TransactionDialog
            type='income'
            mode='create'
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            onSubmit={(data) => {
              handleCreate(data)
              setIsCreateOpen(false)
            }}
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
