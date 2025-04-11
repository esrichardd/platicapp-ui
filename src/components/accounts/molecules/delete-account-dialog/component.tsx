import { Button } from '@/components/common/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/ui/dialog'
import { DeleteAccountDialogProps } from './types'

export function DeleteAccountDialog({
  open,
  onOpenChange,
  account,
  onDelete,
}: DeleteAccountDialogProps) {
  if (!account) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Eliminar Cuenta</DialogTitle>
          <DialogDescription>
            Esta acción eliminará permanentemente la cuenta{' '}
            <strong>{account.account_name}</strong>. ¿Deseas continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant='destructive' onClick={onDelete}>
            Eliminar Cuenta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
