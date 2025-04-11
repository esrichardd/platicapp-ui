'use client'

import { useCategoriesContext } from '@/lib/context/categories/context'
import {
  CategoryDialog,
  DeleteCategoryDialog,
  DeleteSubcategoryDialog,
  SubcategoryDialog,
} from '@/components/categories/molecules'
import {
  CategoriesTab,
  SubcategoriesTab,
} from '@/components/categories/organisms'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/ui/tabs'

export function CategoriesTemplate() {
  const {
    // Categoría
    categories,
    categoryDialogOpen,
    setCategoryDialogOpen,
    editingCategory,
    updateCategory,
    createCategory,
    setEditingCategory,
    categoryToDelete,
    setCategoryToDelete,
    deleteCategory,

    // Subcategoría
    subcategories,
    subcategoryDialogOpen,
    setSubcategoryDialogOpen,
    updateSubcategory,
    createSubcategory,
    editingSubcategory,
    setEditingSubcategory,
    subcategoryToDelete,
    setSubcategoryToDelete,
    deleteSubcategory,
  } = useCategoriesContext()

  return (
    <main className='flex-1 p-6'>
      <Tabs defaultValue='categories' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='categories'>Categorías</TabsTrigger>
          <TabsTrigger value='subcategories'>Subcategorías</TabsTrigger>
        </TabsList>

        <TabsContent value='categories'>
          <CategoriesTab />
        </TabsContent>

        <TabsContent value='subcategories'>
          <SubcategoriesTab />
        </TabsContent>
      </Tabs>

      {/* Diálogo de categoría */}
      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        mode={editingCategory ? 'edit' : 'create'}
        initialData={editingCategory || undefined}
        onSubmit={(data) => {
          if (editingCategory) {
            updateCategory.mutate({
              id: editingCategory.id,
              data,
            })
          } else {
            createCategory.mutate(data)
          }
          setCategoryDialogOpen(false)
          setEditingCategory(null)
        }}
      />

      {/* Diálogo de subcategoría */}
      <SubcategoryDialog
        open={subcategoryDialogOpen}
        onOpenChange={setSubcategoryDialogOpen}
        mode={editingSubcategory ? 'edit' : 'create'}
        initialData={editingSubcategory || undefined}
        categories={categories}
        onSubmit={(data) => {
          if (editingSubcategory) {
            updateSubcategory.mutate({
              id: editingSubcategory.id,
              payload: data,
            })
          } else {
            createSubcategory.mutate(data)
          }
          setSubcategoryDialogOpen(false)
          setEditingSubcategory(null)
        }}
      />

      {/* Confirmación de borrado de categoría */}
      <DeleteCategoryDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        category={categoryToDelete!}
        hasSubcategories={
          !!categoryToDelete &&
          subcategories.some((s) => s.category_id === categoryToDelete.id)
        }
        onConfirmDelete={() => {
          if (categoryToDelete) {
            deleteCategory.mutate(categoryToDelete.id)
            setCategoryToDelete(null)
          }
        }}
      />

      {/* Confirmación de borrado de subcategoría */}
      <DeleteSubcategoryDialog
        open={!!subcategoryToDelete}
        onOpenChange={(open) => !open && setSubcategoryToDelete(null)}
        subcategory={subcategoryToDelete!}
        onConfirmDelete={() => {
          if (subcategoryToDelete) {
            deleteSubcategory.mutate(subcategoryToDelete.id)
            setSubcategoryToDelete(null)
          }
        }}
      />
    </main>
  )
}
