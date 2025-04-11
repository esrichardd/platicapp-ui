import {
  useCreateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useSubcategoriesQuery,
  useUpdateSubcategoryMutation,
} from '@/lib/queries/subcategories'

export function useSubcategoriesData() {
  const {
    data: subcategories = [],
    isLoading: isLoadingSubcategories,
    isError: isErrorSubcategories,
  } = useSubcategoriesQuery()

  const createSubcategory = useCreateSubcategoryMutation()
  const updateSubcategory = useUpdateSubcategoryMutation()
  const deleteSubcategory = useDeleteSubcategoryMutation()

  return {
    subcategories,
    isLoadingSubcategories,
    isErrorSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  }
}
