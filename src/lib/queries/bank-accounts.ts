import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createBankAccount,
  deleteBankAccount,
  getAllBankAccounts,
  updateBankAccount,
} from '@/services/bank-accounts'
import { Account, AccountInput } from '@/lib/sdk-types/account'

export function useBankAccountsQuery() {
  return useQuery<Account[]>({
    queryKey: ['bank-accounts'],
    queryFn: getAllBankAccounts,
  })
}

export function useCreateBankAccountMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AccountInput) => createBankAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] })
    },
  })
}

export function useUpdateBankAccountMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AccountInput> }) =>
      updateBankAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] })
    },
  })
}

export function useDeleteBankAccountMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBankAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] })
    },
  })
}
