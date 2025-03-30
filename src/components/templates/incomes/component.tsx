'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTransactionFilters } from '@/lib/hooks/use-transaction-filters'
import { Transaction } from '@/lib/sdk-types'
import { Button } from '@/components/ui/button'
import {
  CreateTransactionDialog,
  PaginationControls,
  TransactionFilterBar,
  TransactionTable,
} from '@/components/organisms'

const incomeData: Transaction[] = [
  {
    id: 1,
    type: 'income',
    description: 'Salario',
    category: 'Empleo',
    amount: 3500.0,
    date: '2023-06-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 2,
    type: 'income',
    description: 'Trabajo freelance',
    category: 'Autónomo',
    amount: 850.0,
    date: '2023-06-05',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 3,
    type: 'income',
    description: 'Pago de dividendos',
    category: 'Inversión',
    amount: 125.5,
    date: '2023-06-15',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 4,
    type: 'income',
    description: 'Rental Income',
    category: 'Inmobiliario',
    amount: 1200.0,
    date: '2023-06-01',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 5,
    type: 'income',
    description: 'Side Project',
    category: 'Autónomo',
    amount: 450.0,
    date: '2023-06-20',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 6,
    type: 'income',
    description: 'Tax Refund',
    category: 'Gobierno',
    amount: 750.0,
    date: '2023-06-18',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 7,
    type: 'income',
    description: 'Interest',
    category: 'Inversión',
    amount: 35.25,
    date: '2023-06-30',
    account: 'Ahorros',
    status: 'Pendiente',
  },
  {
    id: 8,
    type: 'income',
    description: 'Gift',
    category: 'Personal',
    amount: 200.0,
    date: '2023-06-25',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 9,
    type: 'income',
    description: 'Bonus',
    category: 'Empleo',
    amount: 1000.0,
    date: '2023-07-05',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 10,
    type: 'income',
    description: 'Stock Dividend',
    category: 'Inversión',
    amount: 320.75,
    date: '2023-07-10',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 11,
    type: 'income',
    description: 'Consulting Fee',
    category: 'Autónomo',
    amount: 1500.0,
    date: '2023-07-15',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 12,
    type: 'income',
    description: 'Rental Property 2',
    category: 'Inmobiliario',
    amount: 950.0,
    date: '2023-07-01',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 13,
    type: 'income',
    description: 'Tax Return',
    category: 'Gobierno',
    amount: 1250.0,
    date: '2023-07-20',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 14,
    type: 'income',
    description: 'Online Course Sales',
    category: 'Autónomo',
    amount: 750.0,
    date: '2023-07-25',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 15,
    type: 'income',
    description: 'Savings Interest',
    category: 'Inversión',
    amount: 45.5,
    date: '2023-07-30',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 16,
    type: 'income',
    description: 'Royalty Payment',
    category: 'Autónomo',
    amount: 325.0,
    date: '2023-08-05',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 17,
    type: 'income',
    description: 'Part-time Job',
    category: 'Empleo',
    amount: 600.0,
    date: '2023-08-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 18,
    type: 'income',
    description: 'Affiliate Commission',
    category: 'Autónomo',
    amount: 250.0,
    date: '2023-08-15',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 19,
    type: 'income',
    description: 'Rental Deposit Return',
    category: 'Inmobiliario',
    amount: 1000.0,
    date: '2023-08-20',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 20,
    type: 'income',
    description: 'Cryptocurrency Gain',
    category: 'Inversión',
    amount: 1750.0,
    date: '2023-08-25',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 21,
    type: 'income',
    description: 'Garage Sale',
    category: 'Personal',
    amount: 350.0,
    date: '2023-08-30',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 22,
    type: 'income',
    description: 'Tutoring',
    category: 'Autónomo',
    amount: 400.0,
    date: '2023-09-05',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 23,
    type: 'income',
    description: 'Quarterly Bonus',
    category: 'Empleo',
    amount: 2000.0,
    date: '2023-09-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 24,
    type: 'income',
    description: 'Dividend Payout',
    category: 'Inversión',
    amount: 175.25,
    date: '2023-09-15',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 25,
    type: 'income',
    description: 'Rental Income Property 3',
    category: 'Inmobiliario',
    amount: 1100.0,
    date: '2023-09-20',
    account: 'Ahorros',
    status: 'Completado',
  },
]

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
  } = useTransactionFilters(incomeData)

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
    // Aquí deberías agregarlo al estado o enviar a un backend
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

          <CreateTransactionDialog
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
