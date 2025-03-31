'use client'

import { useEffect, useState } from 'react'
import { TransactionInput } from '@/lib/sdk-types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ACCOUNTS, CATEGORIES } from './constants'
import { CreateTransactionDialogProps } from './type'

export function CreateTransactionDialog({
  type,
  mode,
  onSubmit,
  initialData,
  open,
  onOpenChange,
}: CreateTransactionDialogProps) {
  const [form, setForm] = useState<TransactionInput>({
    description: '',
    amount: 0,
    category: '',
    account: '',
    date: '',
    type: type,
  })

  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      setForm(initialData)
    } else if (!open && mode === 'create') {
      setForm({
        description: '',
        amount: 0,
        category: '',
        account: '',
        date: '',
        type: type,
      })
    }
  }, [open, mode, initialData, type])

  const handleChange = (
    field: keyof TransactionInput,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (
      !form.description ||
      !form.amount ||
      !form.category ||
      !form.account ||
      !form.date
    ) {
      alert('Por favor completa todos los campos')
      return
    }

    onSubmit(form)
    onOpenChange?.(false)
  }

  const capitalizedType = type === 'income' ? 'Ingreso' : 'Gasto'
  const actionLabel = mode === 'create' ? 'Agregar' : 'Editar'
  const categories = CATEGORIES[type]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {actionLabel} {capitalizedType}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? `Completa los datos para agregar un nuevo ${type === 'income' ? 'ingreso' : 'gasto'}.`
              : `Modifica los campos para actualizar el ${type === 'income' ? 'ingreso' : 'gasto'}.`}
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Descripción
            </Label>
            <Input
              id='description'
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className='col-span-3'
              placeholder='Ej: Salario, Alquiler...'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='amount' className='text-right'>
              Cantidad
            </Label>
            <Input
              id='amount'
              type='number'
              value={form.amount}
              onChange={(e) =>
                handleChange('amount', parseFloat(e.target.value))
              }
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Categoría</Label>
            <Select
              value={form.category}
              onValueChange={(val) => handleChange('category', val)}
            >
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Selecciona' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Cuenta</Label>
            <Select
              value={form.account}
              onValueChange={(val) => handleChange('account', val)}
            >
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Selecciona' />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNTS.map((acc) => (
                  <SelectItem key={acc} value={acc}>
                    {acc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='date' className='text-right'>
              Fecha
            </Label>
            <Input
              id='date'
              type='date'
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === 'create' ? 'Guardar' : 'Actualizar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
