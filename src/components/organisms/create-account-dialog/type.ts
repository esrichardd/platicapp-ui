import { AccountInput, Bank } from '@/lib/sdk-types'

export type CreateAccountDialogProps = {
  open: boolean
  mode: 'create' | 'edit'
  selectedBank: Bank | null
  onOpenChange: (value: boolean) => void
  onSubmit: (data: AccountInput) => void
  initialData?: AccountInput
}
