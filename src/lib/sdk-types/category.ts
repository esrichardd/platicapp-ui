export type Category = {
  id: number
  name: string
  icon: string
  color: string
  description?: string
}

export type CategoryInput = Omit<Category, 'id'>
