'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Category, Subcategory } from '@/lib/sdk-types'
import {
  CategoryCard,
  CategoryDialog,
  DeleteCategoryDialog,
  DeleteSubcategoryDialog,
  SubcategoryCard,
  SubcategoryDialog,
} from '@/components/categories/molecules'
import { Button } from '@/components/common/ui/button'
import { Input } from '@/components/common/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/ui/tabs'
import { CATEGORIES_MOCK, SUBCATEGORIES_MOCK } from './constants'

export function CategoriesTemplate() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES_MOCK)
  const [subcategories, setSubcategories] =
    useState<Subcategory[]>(SUBCATEGORIES_MOCK)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  )
  const [searchTerm, setSearchTerm] = useState('')

  // Form Dialogs
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false)
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null)

  // Delete Dialogs
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  )
  const [subcategoryToDelete, setSubcategoryToDelete] =
    useState<Subcategory | null>(null)

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSubcategories = subcategories.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategoryId
      ? sub.parentCategoryId === selectedCategoryId
      : true
    return matchesSearch && matchesCategory
  })

  return (
    <main className='flex-1 p-6'>
      <Tabs defaultValue='categories' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='categories'>Categorías</TabsTrigger>
          <TabsTrigger value='subcategories'>Subcategorías</TabsTrigger>
        </TabsList>

        <TabsContent value='categories'>
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
                  subcategories.filter(
                    (s) => s.parentCategoryId === category.id,
                  ).length
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
        </TabsContent>

        <TabsContent value='subcategories'>
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
              const parent = categories.find(
                (c) => c.id === sub.parentCategoryId,
              )
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
        </TabsContent>
      </Tabs>

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        mode={editingCategory ? 'edit' : 'create'}
        initialData={editingCategory || undefined}
        onSubmit={(data) => {
          if (editingCategory) {
            setCategories((prev) =>
              prev.map((cat) =>
                cat.id === editingCategory.id ? { ...cat, ...data } : cat,
              ),
            )
          } else {
            setCategories((prev) => [...prev, { ...data }])
          }
        }}
      />

      <SubcategoryDialog
        open={subcategoryDialogOpen}
        onOpenChange={setSubcategoryDialogOpen}
        mode={editingSubcategory ? 'edit' : 'create'}
        initialData={editingSubcategory || undefined}
        categories={categories}
        onSubmit={(data) => {
          if (editingSubcategory) {
            setSubcategories((prev) =>
              prev.map((s) =>
                s.id === editingSubcategory.id ? { ...s, ...data } : s,
              ),
            )
          } else {
            setSubcategories((prev) => [...prev, { ...data }])
          }
        }}
      />

      <DeleteCategoryDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        category={categoryToDelete as Category}
        hasSubcategories={
          !!categoryToDelete &&
          subcategories.some((s) => s.parentCategoryId === categoryToDelete.id)
        }
        onConfirmDelete={() => {
          if (categoryToDelete) {
            setCategories((prev) =>
              prev.filter((c) => c.id !== categoryToDelete.id),
            )
            setCategoryToDelete(null)
            setSelectedCategoryId((id) =>
              id === categoryToDelete.id ? null : id,
            )
          }
        }}
      />

      <DeleteSubcategoryDialog
        open={!!subcategoryToDelete}
        onOpenChange={(open) => !open && setSubcategoryToDelete(null)}
        subcategory={subcategoryToDelete as Subcategory}
        onConfirmDelete={() => {
          if (subcategoryToDelete) {
            setSubcategories((prev) =>
              prev.filter((s) => s.id !== subcategoryToDelete.id),
            )
            setSubcategoryToDelete(null)
          }
        }}
      />
    </main>
  )
}
