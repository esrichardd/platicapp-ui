'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Account, Bank } from '@/lib/sdk-types'
import {
  AccountDialog,
  BankDialog,
  DeleteAccountDialog,
  DeleteBankDialog,
} from '@/components/accounts/molecules'
import { AccountTable, BankList } from '@/components/accounts/organisms'
import { Button } from '@/components/common/ui/button'
import { ACCOUNTS_MOCK, BANKS_MOCK } from './constants'

export function AccountsTemplate() {
  const [banks, setBanks] = useState<Bank[]>(BANKS_MOCK)
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS_MOCK)
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

      <BankDialog
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

      <AccountDialog
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
