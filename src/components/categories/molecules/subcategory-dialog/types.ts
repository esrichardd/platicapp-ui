import { Category, Subcategory, SubcategoryInput } from '@/lib/sdk-types'

export type SubcategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  initialData?: Subcategory
  categories: Category[]
  onSubmit: (data: SubcategoryInput) => void
}
