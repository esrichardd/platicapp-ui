import { Subcategory } from '@/lib/sdk-types'

export type SubcategoryFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  initialData?: Subcategory
  categories: { id: number; name: string }[]
  onSubmit: (data: Subcategory) => void
}
