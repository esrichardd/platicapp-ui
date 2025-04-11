import { useCategoriesData } from './use-categories-data'
import { useCategoriesUiState } from './use-categories-ui-state'
import { useSubcategoriesData } from './use-subcategories-data'

export function useCategoriesManager() {
  const {
    categories,
    isLoadingCategories,
    isErrorCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesData()

  const {
    subcategories,
    isLoadingSubcategories,
    isErrorSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  } = useSubcategoriesData()

  const uiState = useCategoriesUiState(categories, subcategories)

  return {
    // categories
    categories,
    isLoadingCategories,
    isErrorCategories,
    createCategory,
    updateCategory,
    deleteCategory,

    // subcategories
    subcategories,
    isLoadingSubcategories,
    isErrorSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,

    // UI
    ...uiState,
  }
}
