'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Subcategory } from '@/lib/sdk-types'
import { Category } from '@/lib/sdk-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CategoryCard } from '@/components/molecules/category-card/component'
import { SubcategoryCard } from '@/components/molecules/subcategory-card/component'
import { CategoryFormDialog } from '@/components/organisms/create-category-dialog/component'
import { SubcategoryFormDialog } from '@/components/organisms/create-subcategory-dialog/component'
import { DeleteCategoryDialog } from '@/components/organisms/delete-category-dialog/component'
import { DeleteSubcategoryDialog } from '@/components/organisms/delete-subcategory-dialog/component'

const sampleCategories = [
  {
    id: 1,
    name: 'Vivienda',
    icon: 'Hogar',
    color: '#60a5fa',
    description: 'Gastos del hogar',
  },
  {
    id: 2,
    name: 'Transporte',
    icon: 'Transporte',
    color: '#4ade80',
    description: 'Movilidad',
  },
]

const sampleSubcategories = [
  {
    id: 1,
    categoryId: 1,
    name: 'Alquiler',
    icon: 'Hogar',
    color: '#60a5fa',
    description: 'Pago mensual',
    parentCategoryId: 1,
  },
  {
    id: 2,
    categoryId: 1,
    name: 'Servicios',
    icon: 'Otro',
    color: '#93c5fd',
    description: 'Luz, agua, etc.',
    parentCategoryId: 1,
  },
  {
    id: 3,
    categoryId: 2,
    name: 'Gasolina',
    icon: 'Transporte',
    color: '#86efac',
    description: 'Combustible',
    parentCategoryId: 2,
  },
]

export function CategoriesTemplate() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [subcategories, setSubcategories] =
    useState<Subcategory[]>(sampleSubcategories)
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

      <CategoryFormDialog
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

      <SubcategoryFormDialog
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
