import { Subcategory } from '@/lib/sdk-types'

export type DeleteSubcategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  subcategory: Subcategory
  onConfirmDelete: () => void
}
