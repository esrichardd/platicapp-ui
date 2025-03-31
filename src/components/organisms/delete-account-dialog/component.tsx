import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DeleteAccountDialogProps } from './type'

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
            <strong>{account.name}</strong>. ¿Deseas continuar?
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
