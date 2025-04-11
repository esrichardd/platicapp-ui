import { Category } from '@/lib/sdk-types/category'

export type CategoryCardProps = {
  category: Category
  subcategoriesCount: number
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  onViewSubcategories: (categoryId: string) => void
}
