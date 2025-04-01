import { Subcategory } from '@/lib/sdk-types'

export type SubcategoryCardProps = {
  subcategory: Subcategory
  parentCategoryName?: string
  onEdit: (subcategory: Subcategory) => void
  onDelete: (subcategory: Subcategory) => void
}
