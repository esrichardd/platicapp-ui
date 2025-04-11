import { useMemo, useState } from 'react'
import { Category, Subcategory } from '@/lib/sdk-types'

export function useCategoriesUiState(
  categories: Category[],
  subcategories: Subcategory[],
) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  )

  const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false)
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null)
  const [subcategoryToDelete, setSubcategoryToDelete] =
    useState<Subcategory | null>(null)

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [categories, searchTerm])

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter((sub) => {
      const matchesSearch = sub.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategoryId
        ? sub.parentCategoryId === selectedCategoryId
        : true
      return matchesSearch && matchesCategory
    })
  }, [subcategories, searchTerm, selectedCategoryId])

  return {
    // Estado
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,

    // Categoría UI
    categoryDialogOpen,
    setCategoryDialogOpen,
    editingCategory,
    setEditingCategory,
    categoryToDelete,
    setCategoryToDelete,

    // Subcategoría UI
    subcategoryDialogOpen,
    setSubcategoryDialogOpen,
    editingSubcategory,
    setEditingSubcategory,
    subcategoryToDelete,
    setSubcategoryToDelete,

    // Filtrados
    filteredCategories,
    filteredSubcategories,
  }
}
