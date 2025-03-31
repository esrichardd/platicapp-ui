'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DeleteBankDialogProps } from './type'

export function DeleteBankDialog({
  open,
  onOpenChange,
  bank,
  accounts,
  onDelete,
}: DeleteBankDialogProps) {
  if (!bank) return null

  const hasAccounts = accounts.some((acc) => acc.bankId === bank.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Eliminar Banco</DialogTitle>
          <DialogDescription>
            ¿Está seguro que desea eliminar este banco? Esta acción no se puede
            deshacer.
          </DialogDescription>
        </DialogHeader>

        <div className='py-4'>
          <div className='flex items-center gap-3 rounded-lg border p-3'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background'>
              <Image
                src={bank.logo || '/placeholder.svg'}
                alt={bank.name}
                width={40}
                height={40}
                className='rounded-md'
              />
            </div>
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium leading-none'>{bank.name}</p>
              <div className='flex items-center text-xs text-muted-foreground'>
                <Globe className='mr-1 h-3 w-3' />
                <span>{bank.country}</span>
                <span className='mx-1'>•</span>
                <span>{bank.currency}</span>
              </div>
            </div>
          </div>

          {hasAccounts && (
            <div className='mt-4 rounded-lg border border-destructive p-3 text-destructive'>
              <p className='text-sm font-medium'>
                Este banco tiene cuentas asociadas. Por favor elimine todas las
                cuentas primero.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={onDelete}
            disabled={hasAccounts}
          >
            Eliminar Banco
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
