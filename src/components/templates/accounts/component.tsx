'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Account, Bank } from '@/lib/sdk-types'
import { Button } from '@/components/ui/button'
import {
  AccountTable,
  BankList,
  CreateAccountDialog,
  CreateBankDialog,
  DeleteAccountDialog,
  DeleteBankDialog,
} from '@/components/organisms'

// Datos de muestra para bancos
const banksData = [
  {
    id: 1,
    name: 'Banco de América',
    country: 'Estados Unidos',
    currency: 'USD',
    logo: '/no-image.png?height=40&width=40',
  },
  {
    id: 2,
    name: 'HSBC',
    country: 'Reino Unido',
    currency: 'GBP',
    logo: '/no-image.png?height=40&width=40',
  },
  {
    id: 3,
    name: 'Santander',
    country: 'España',
    currency: 'EUR',
    logo: '/no-image.png?height=40&width=40',
  },
  {
    id: 4,
    name: 'Deutsche Bank',
    country: 'Alemania',
    currency: 'EUR',
    logo: '/no-image.png?height=40&width=40',
  },
  {
    id: 5,
    name: 'Citibank',
    country: 'Estados Unidos',
    currency: 'USD',
    logo: '/no-image.png?height=40&width=40',
  },
]

// Datos de muestra para cuentas
const accountsData = [
  {
    id: 1,
    bankId: 1,
    name: 'Cuenta Corriente Principal',
    accountNumber: '****4567',
    type: 'Corriente',
    balance: 3500.75,
    currency: 'USD',
  },
  {
    id: 2,
    bankId: 1,
    name: 'Cuenta de Ahorro',
    accountNumber: '****7890',
    type: 'Ahorro',
    balance: 12500.5,
    currency: 'USD',
  },
  {
    id: 3,
    bankId: 2,
    name: 'Cuenta HSBC',
    accountNumber: '****2345',
    type: 'Corriente',
    balance: 2800.3,
    currency: 'GBP',
  },
  {
    id: 4,
    bankId: 3,
    name: 'Ahorro Santander',
    accountNumber: '****8901',
    type: 'Ahorro',
    balance: 9500.0,
    currency: 'EUR',
  },
  {
    id: 5,
    bankId: 4,
    name: 'Inversión Deutsche',
    accountNumber: '****3456',
    type: 'Inversión',
    balance: 35000.0,
    currency: 'EUR',
  },
  {
    id: 6,
    bankId: 5,
    name: 'Cuenta Citibank',
    accountNumber: '****6789',
    type: 'Corriente',
    balance: 4200.25,
    currency: 'USD',
  },
  {
    id: 7,
    bankId: 5,
    name: 'Ahorro Citibank',
    accountNumber: '****0123',
    type: 'Ahorro',
    balance: 15800.75,
    currency: 'USD',
  },
]

export function AccountsTemplate() {
  const [banks, setBanks] = useState<Bank[]>(banksData)
  const [accounts, setAccounts] = useState<Account[]>(accountsData)
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null)

  const [isCreateBankOpen, setIsCreateBankOpen] = useState(false)
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false)

  const [editBank, setEditBank] = useState<Bank | null>(null)
  const [deleteBank, setDeleteBank] = useState<Bank | null>(null)

  const [deleteAccount, setDeleteAccount] = useState<Account | null>(null)

  const selectedBank = banks.find((bank) => bank.id === selectedBankId) || null
  const filteredAccounts = accounts.filter(
    (acc) => acc.bankId === selectedBankId,
  )

  const handleSubmitBank = (data: {
    name: string
    country: string
    currency: string
  }) => {
    if (editBank) {
      setBanks((prev) =>
        prev.map((b) => (b.id === editBank.id ? { ...editBank, ...data } : b)),
      )
      setEditBank(null)
    } else {
      const id = Math.max(0, ...banks.map((b) => b.id)) + 1
      setBanks((prev) => [...prev, { id, logo: '/placeholder.svg', ...data }])
    }
  }

  const handleDeleteBank = () => {
    if (!deleteBank) return
    const hasAccounts = accounts.some((acc) => acc.bankId === deleteBank.id)
    if (hasAccounts) return
    setBanks((prev) => prev.filter((b) => b.id !== deleteBank.id))
    if (selectedBankId === deleteBank.id) setSelectedBankId(null)
    setDeleteBank(null)
  }

  const handleSubmitAccount = (
    data: Omit<Account, 'id' | 'bankId' | 'currency'>,
  ) => {
    if (!selectedBank) return
    const id = Math.max(0, ...accounts.map((a) => a.id)) + 1
    const newAccount: Account = {
      id,
      bankId: selectedBank.id,
      currency: selectedBank.currency,
      ...data,
      balance: parseFloat(data.balance.toString()),
    }
    setAccounts((prev) => [...prev, newAccount])
  }

  const handleDeleteAccount = () => {
    if (!deleteAccount) return
    setAccounts((prev) => prev.filter((a) => a.id !== deleteAccount.id))
    setDeleteAccount(null)
  }

  return (
    <main className='flex-1 overflow-auto p-6'>
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <h2 className='text-2xl font-bold tracking-tight'>Cuentas</h2>
          <div className='ml-auto flex flex-wrap gap-2 sm:flex-row sm:items-center'>
            <Button variant='outline' onClick={() => setIsCreateBankOpen(true)}>
              <Plus className='mr-2 h-4 w-4' /> Agregar Banco
            </Button>
            <Button
              disabled={!selectedBankId}
              onClick={() => setIsCreateAccountOpen(true)}
            >
              <Plus className='mr-2 h-4 w-4' /> Agregar Cuenta
            </Button>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-12'>
          <BankList
            banks={banks}
            selectedBankId={selectedBankId}
            onSelectBank={(bank) => setSelectedBankId(bank)}
            onEditBank={(bank) => setEditBank(bank)}
            onDeleteBank={(bank) => setDeleteBank(bank)}
          />

          <AccountTable
            accounts={filteredAccounts}
            selectedBank={selectedBank}
            onCreateAccount={() => setIsCreateAccountOpen(true)}
            onDeleteAccount={(account) => setDeleteAccount(account)}
          />
        </div>
      </div>

      <CreateBankDialog
        open={isCreateBankOpen || !!editBank}
        onOpenChange={(v) => {
          if (!v) setEditBank(null)
          setIsCreateBankOpen(v)
        }}
        onSubmit={handleSubmitBank}
        initialData={editBank || undefined}
        mode={editBank ? 'edit' : 'create'}
      />

      <DeleteBankDialog
        open={!!deleteBank}
        onOpenChange={() => setDeleteBank(null)}
        bank={deleteBank}
        accounts={accounts}
        onDelete={handleDeleteBank}
      />

      <CreateAccountDialog
        open={isCreateAccountOpen}
        onOpenChange={setIsCreateAccountOpen}
        onSubmit={handleSubmitAccount}
        selectedBank={selectedBank || null}
        mode='create'
      />

      <DeleteAccountDialog
        open={!!deleteAccount}
        onOpenChange={() => setDeleteAccount(null)}
        account={deleteAccount}
        onDelete={handleDeleteAccount}
      />
    </main>
  )
}
