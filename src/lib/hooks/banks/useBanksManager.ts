import { useState } from 'react'
import {
  useBankAccountsQuery,
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useUpdateBankAccountMutation,
} from '@/lib/queries/bank-accounts'
import {
  useBanksQuery,
  useCreateBankMutation,
  useDeleteBankMutation,
  useUpdateBankMutation,
} from '@/lib/queries/banks'
import type { Bank, BankInput } from '@/lib/sdk-types'
import type { Account, AccountInput } from '@/lib/sdk-types/account'

export function useAccountsManager() {
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null)

  const [isCreateBankOpen, setIsCreateBankOpen] = useState(false)
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false)

  const [editBank, setEditBank] = useState<Bank | null>(null)
  const [deleteBank, setDeleteBank] = useState<Bank | null>(null)
  const [deleteAccount, setDeleteAccount] = useState<Account | null>(null)
  const [editAccount, setEditAccount] = useState<Account | null>(null)

  const { data: banks = [], isLoading: isLoadingBanks } = useBanksQuery()
  const { data: accounts = [], isLoading: isLoadingAccounts } =
    useBankAccountsQuery()

  const createBankMutation = useCreateBankMutation()
  const updateBankMutation = useUpdateBankMutation()
  const deleteBankMutation = useDeleteBankMutation()

  const createAccountMutation = useCreateBankAccountMutation()
  const deleteAccountMutation = useDeleteBankAccountMutation()
  const updateAccountMutation = useUpdateBankAccountMutation()

  const selectedBank = banks.find((bank) => bank.id === selectedBankId) || null
  const filteredAccounts = accounts.filter(
    (acc) => acc.bank_id === selectedBankId,
  )

  const handleSubmitBank = async (data: BankInput) => {
    if (editBank) {
      await updateBankMutation.mutateAsync({ id: editBank.id, data })
      setEditBank(null)
    } else {
      await createBankMutation.mutateAsync(data)
    }
    setIsCreateBankOpen(false)
  }

  const handleDeleteBank = async () => {
    if (!deleteBank) return
    const hasAccounts = accounts.some((acc) => acc.bank_id === deleteBank.id)
    if (hasAccounts) return
    await deleteBankMutation.mutateAsync(deleteBank.id)
    if (selectedBankId === deleteBank.id) setSelectedBankId(null)
    setDeleteBank(null)
  }

  const handleSubmitAccount = async (data: Omit<AccountInput, 'bank_id'>) => {
    if (!selectedBank) return
    const payload: AccountInput = {
      ...data,
      bank_id: selectedBank.id,
    }
    if (editAccount) {
      await updateAccountMutation.mutateAsync({
        id: editAccount.id,
        data: payload,
      })
      setEditAccount(null)
    } else {
      await createAccountMutation.mutateAsync(payload)
    }
    setIsCreateAccountOpen(false)
  }

  const handleDeleteAccount = async () => {
    if (!deleteAccount) return
    await deleteAccountMutation.mutateAsync(deleteAccount.id)
    setDeleteAccount(null)
  }

  return {
    banks,
    accounts,
    selectedBankId,
    selectedBank,
    filteredAccounts,

    isCreateBankOpen,
    isCreateAccountOpen,

    editBank,
    deleteBank,
    deleteAccount,
    editAccount,

    setSelectedBankId,
    setIsCreateBankOpen,
    setIsCreateAccountOpen,
    setEditBank,
    setDeleteBank,
    setDeleteAccount,
    setEditAccount,

    handleSubmitBank,
    handleDeleteBank,
    handleSubmitAccount,
    handleDeleteAccount,

    isLoadingBanks,
    isLoadingAccounts,
  }
}
