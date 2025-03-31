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
import { DeleteCategoryDialogProps } from './type'

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  hasSubcategories,
  onConfirmDelete,
}: DeleteCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Eliminar Categoría</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        {category && (
          <div className='py-4'>
            <div className='flex items-center gap-3 rounded-lg border p-3'>
              <div
                className='flex h-10 w-10 items-center justify-center rounded-full'
                style={{ backgroundColor: category.color }}
              >
                <div className='text-white'>{getIconByName(category.icon)}</div>
              </div>
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {category.name}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {category.description || 'Sin descripción'}
                </p>
              </div>
            </div>

            {hasSubcategories && (
              <div className='mt-4 rounded-lg border border-destructive p-3 text-destructive'>
                <p className='text-sm font-medium'>
                  Esta categoría tiene subcategorías asociadas. Por favor,
                  elimina las subcategorías primero.
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={onConfirmDelete}
            disabled={hasSubcategories}
          >
            Eliminar Categoría
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
