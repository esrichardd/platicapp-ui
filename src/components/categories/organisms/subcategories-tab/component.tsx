'use client'

import { Plus } from 'lucide-react'
import { useCategoriesContext } from '@/lib/context/categories/context'
import { SubcategoryCard } from '@/components/categories/molecules'
import { Button } from '@/components/common/ui/button'
import { Input } from '@/components/common/ui/input'

export function SubcategoriesTab() {
  const {
    filteredSubcategories,
    categories,
    searchTerm,
    setSearchTerm,
    setEditingSubcategory,
    setSubcategoryDialogOpen,
    setSubcategoryToDelete,
  } = useCategoriesContext()

  return (
    <>
      <div className='flex items-center gap-4 my-4'>
        <Input
          placeholder='Buscar subcategoría...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => {
            setEditingSubcategory(null)
            setSubcategoryDialogOpen(true)
          }}
        >
          <Plus className='mr-2 h-4 w-4' /> Agregar
        </Button>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredSubcategories.map((sub) => {
          const parent = categories.find((c) => c.id === sub.category_id)
          return (
            <SubcategoryCard
              key={sub.id}
              subcategory={sub}
              parentCategoryName={parent?.name}
              onEdit={(s) => {
                setEditingSubcategory(s)
                setSubcategoryDialogOpen(true)
              }}
              onDelete={setSubcategoryToDelete}
            />
          )
        })}
      </div>
    </>
  )
}
