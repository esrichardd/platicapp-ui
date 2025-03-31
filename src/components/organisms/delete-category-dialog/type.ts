import { Category } from '@/lib/sdk-types'

export type DeleteCategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category
  hasSubcategories: boolean
  onConfirmDelete: () => void
}
