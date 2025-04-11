import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createBank,
  deleteBank,
  getAllBanks,
  updateBank,
} from '@/services/banks'
import { Bank, BankInput } from '@/lib/sdk-types/bank'

export function useBanksQuery() {
  return useQuery<Bank[]>({
    queryKey: ['banks'],
    queryFn: getAllBanks,
  })
}

export function useCreateBankMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BankInput) => createBank(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
    },
  })
}

export function useUpdateBankMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BankInput> }) =>
      updateBank(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
    },
  })
}

export function useDeleteBankMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBank(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
    },
  })
}
