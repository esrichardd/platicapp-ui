export type Category = {
  id: string
  name: string
  icon: string
  color: string
  description?: string
  created_at: Date
  updated_at: Date
}

export type CategoryInput = Omit<Category, 'id' | 'created_at' | 'updated_at'>
