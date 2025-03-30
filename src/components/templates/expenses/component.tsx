'use client'

import {
  Transaction,
  useTransactionFilters,
} from '@/lib/hooks/use-transaction-filters'
import {
  CreateTransactionDialog,
  PaginationControls,
  TransactionFilterBar,
  TransactionTable,
} from '@/components/organisms'

const expenseData: Transaction[] = [
  {
    id: 1,
    description: 'Alquiler mensual',
    category: 'Vivienda',
    amount: 800.0,
    date: '2023-06-01',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 2,
    description: 'Compra de supermercado',
    category: 'Alimentación',
    amount: 150.0,
    date: '2023-06-05',
    account: 'Ahorros',
    status: 'Pendiente',
  },
  {
    id: 3,
    description: 'Gasolina',
    category: 'Transporte',
    amount: 60.0,
    date: '2023-06-07',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 4,
    description: 'Internet y teléfono',
    category: 'Servicios',
    amount: 55.0,
    date: '2023-06-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  // Puedes agregar más gastos aquí...
]

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
  } = useTransactionFilters(expenseData)

  const handleBulkAction = (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: number[],
  ) => {
    alert(`${action.toUpperCase()} ${ids.length} gastos`)
    clearSelection()
  }

  const handleCreate = (newExpense: Omit<Transaction, 'id' | 'status'>) => {
    alert(`Gasto creado: ${JSON.stringify(newExpense, null, 2)}`)
    // Aquí puedes guardar el gasto en backend o estado global
  }

  return (
    <main className='flex-1 p-4 sm:p-6 overflow-hidden'>
      <div className='flex flex-col gap-6 h-full'>
        <div className='flex justify-between items-center'>
          <CreateTransactionDialog type='expense' onCreate={handleCreate} />
        </div>

        <TransactionFilterBar filters={filters} onFilterChange={setFilters} />

        <TransactionTable
          data={paginatedData}
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
