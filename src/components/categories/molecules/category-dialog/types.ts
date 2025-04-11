import { Category, CategoryInput } from '@/lib/sdk-types'

export type CategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  initialData?: Category
  onSubmit: (data: CategoryInput) => void
}
