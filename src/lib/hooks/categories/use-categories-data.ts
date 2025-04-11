import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/lib/queries/categories'

export function useCategoriesData() {
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategoriesQuery()

  const createCategory = useCreateCategoryMutation()
  const updateCategory = useUpdateCategoryMutation()
  const deleteCategory = useDeleteCategoryMutation()

  return {
    categories,
    isLoadingCategories,
    isErrorCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
