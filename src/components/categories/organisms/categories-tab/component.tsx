'use client'

import { Plus } from 'lucide-react'
import { useCategoriesContext } from '@/lib/context/categories/context'
import { CategoryCard } from '@/components/categories/molecules'
import { Button } from '@/components/common/ui/button'
import { Input } from '@/components/common/ui/input'

export function CategoriesTab() {
  const {
    filteredCategories,
    subcategories,
    setCategoryDialogOpen,
    setEditingCategory,
    setCategoryToDelete,
    setSelectedCategoryId,
    searchTerm,
    setSearchTerm,
  } = useCategoriesContext()

  return (
    <>
      <div className='flex items-center gap-4 my-4'>
        <Input
          placeholder='Buscar categoría...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => {
            setEditingCategory(null)
            setCategoryDialogOpen(true)
          }}
        >
          <Plus className='mr-2 h-4 w-4' /> Agregar
        </Button>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            subcategoriesCount={
              subcategories.filter((s) => s.category_id === category.id).length
            }
            onEdit={(cat) => {
              setEditingCategory(cat)
              setCategoryDialogOpen(true)
            }}
            onDelete={setCategoryToDelete}
            onViewSubcategories={setSelectedCategoryId}
          />
        ))}
      </div>
    </>
  )
}
