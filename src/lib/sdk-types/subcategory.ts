export type Subcategory = {
  id: number
  name: string
  icon: string
  color: string
  description?: string
  parentCategoryId: number
}

export type SubcategoryInput = Omit<Subcategory, 'id'>
