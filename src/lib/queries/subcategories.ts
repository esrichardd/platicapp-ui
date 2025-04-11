import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
} from '@/services/subcategories'
import { SubcategoryInput } from '../sdk-types'

export function useSubcategoriesQuery() {
  return useQuery({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories,
  })
}

export function useSubcategoryByIdQuery(id: string) {
  return useQuery({
    queryKey: ['subcategories', id],
    queryFn: () => getSubcategoryById(id),
  })
}

export function useCreateSubcategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SubcategoryInput) => createSubcategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    },
  })
}

export function useUpdateSubcategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: Partial<SubcategoryInput>
    }) => updateSubcategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    },
  })
}

export function useDeleteSubcategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteSubcategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    },
  })
}
