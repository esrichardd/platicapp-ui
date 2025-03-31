import { Account } from '@/lib/sdk-types'

export type DeleteAccountDialogProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  account: Account | null
  onDelete: () => void
}
