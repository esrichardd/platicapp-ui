'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { CreateTransactionDialogProps, TransactionInput } from './type'

export function CreateTransactionDialog({
  type,
  onCreate,
}: CreateTransactionDialogProps) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<TransactionInput>({
    description: '',
    amount: 0,
    category: '',
    account: '',
    date: '',
  })

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

    onCreate(form)
    setOpen(false)
    setForm({ description: '', amount: 0, category: '', account: '', date: '' })
  }

  const capitalizedType = type === 'income' ? 'Ingreso' : 'Gasto'
  const categories = CATEGORIES[type]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-auto'>
          <Plus className='mr-2 h-4 w-4' />
          Agregar {capitalizedType}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo {capitalizedType}</DialogTitle>
          <DialogDescription>
            Ingresa los detalles de tu {type === 'income' ? 'ingreso' : 'gasto'}{' '}
            y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Descripción
            </Label>
            <Input
              id='description'
              placeholder='Ej: Salario, Alquiler, etc.'
              className='col-span-3'
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='amount' className='text-right'>
              Cantidad
            </Label>
            <Input
              id='amount'
              type='number'
              className='col-span-3'
              value={form.amount}
              onChange={(e) =>
                handleChange('amount', parseFloat(e.target.value))
              }
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
              className='col-span-3'
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar {capitalizedType}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
