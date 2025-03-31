'use client'

import React from 'react'
import { getIconByName } from '@/lib/helpers/get-icon-by-name'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DeleteSubcategoryDialogProps } from './type'

export function DeleteSubcategoryDialog({
  open,
  onOpenChange,
  subcategory,
  onConfirmDelete,
}: DeleteSubcategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Eliminar Subcategoría</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar esta subcategoría? Esta acción
            no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        {subcategory && (
          <div className='py-4'>
            <div className='flex items-center gap-3 rounded-lg border p-3'>
              <div
                className='flex h-10 w-10 items-center justify-center rounded-full'
                style={{ backgroundColor: subcategory.color }}
              >
                <div className='text-white'>
                  {getIconByName(subcategory.icon)}
                </div>
              </div>
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {subcategory.name}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {subcategory.description || 'Sin descripción'}
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant='destructive' onClick={onConfirmDelete}>
            Eliminar Subcategoría
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
