import { Bank } from '@/lib/sdk-types'

export type CreateBankDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { name: string; country: string; currency: string }) => void
  initialData?: Bank
  mode: 'create' | 'edit'
}
