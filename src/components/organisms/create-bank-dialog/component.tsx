'use client'

import { useEffect, useState } from 'react'
import { COUNTRIES, CURRENCIES } from '@/lib/helpers/constants'
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
import { CreateBankDialogProps } from './type'

export function CreateBankDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: CreateBankDialogProps) {
  const [form, setForm] = useState({ name: '', country: '', currency: '' })

  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      setForm(initialData)
    } else if (!open && mode === 'create') {
      setForm({ name: '', country: '', currency: '' })
    }
  }, [open, mode, initialData])

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.country || !form.currency) {
      alert('Por favor completa todos los campos')
      return
    }
    onSubmit(form)
    setForm({ name: '', country: '', currency: '' })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar Banco' : 'Agregar Nuevo Banco'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Actualice los detalles del banco seleccionado.'
              : 'Ingrese los detalles del banco que desea agregar a sus cuentas.'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='bank-name' className='text-right'>
              Nombre del Banco
            </Label>
            <Input
              id='bank-name'
              placeholder='Banco de América'
              className='col-span-3'
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='bank-country' className='text-right'>
              País
            </Label>
            <Select
              value={form.country}
              onValueChange={(value) => handleChange('country', value)}
            >
              <SelectTrigger id='bank-country' className='col-span-3'>
                <SelectValue placeholder='Seleccionar país' />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='bank-currency' className='text-right'>
              Moneda
            </Label>
            <Select
              value={form.currency}
              onValueChange={(value) => handleChange('currency', value)}
            >
              <SelectTrigger id='bank-currency' className='col-span-3'>
                <SelectValue placeholder='Seleccionar moneda' />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>
            {mode === 'edit' ? 'Guardar Cambios' : 'Agregar Banco'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
