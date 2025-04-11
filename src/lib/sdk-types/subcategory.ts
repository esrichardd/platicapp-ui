export type Subcategory = {
  id: string
  name: string
  icon: string
  color: string
  description?: string
  category_id: string
}

export type SubcategoryInput = Omit<Subcategory, 'id'>
