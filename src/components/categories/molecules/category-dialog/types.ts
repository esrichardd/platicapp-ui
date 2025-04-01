import { Category } from '@/lib/sdk-types'

export type CategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  initialData?: Category
  onSubmit: (data: Category) => void
}
