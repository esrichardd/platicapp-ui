'use client'

import { useEffect, useState } from 'react'
import { ACCOUNT_TYPES } from '@/lib/helpers/constants'
import { AccountInput } from '@/lib/sdk-types'
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
import { CreateAccountDialogProps } from './type'

export function CreateAccountDialog({
  open,
  onOpenChange,
  onSubmit,
  selectedBank,
  initialData,
  mode,
}: CreateAccountDialogProps) {
  const [form, setForm] = useState<AccountInput>({
    name: '',
    accountNumber: '',
    type: '',
    balance: 0,
    currency: '',
    bankId: 0,
  })

  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      setForm(initialData)
    } else if (!open && mode === 'create') {
      setForm({
        name: '',
        accountNumber: '',
        type: '',
        currency: '',
        balance: 0,
        bankId: selectedBank?.id || 0,
      })
    }
  }, [open, mode, initialData, selectedBank])

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.accountNumber || !form.type || !form.balance) {
      alert('Por favor completa todos los campos')
      return
    }
    onSubmit(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar Cuenta' : 'Agregar Nueva Cuenta'}
          </DialogTitle>
          <DialogDescription>
            {selectedBank
              ? `${mode === 'edit' ? 'Edita' : 'Agrega'} una cuenta en ${selectedBank.name}`
              : 'Selecciona un banco primero para asociar la cuenta.'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='account-name' className='text-right'>
              Nombre de la Cuenta
            </Label>
            <Input
              id='account-name'
              placeholder='Cuenta Corriente Principal'
              className='col-span-3'
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='account-number' className='text-right'>
              Número de Cuenta
            </Label>
            <Input
              id='account-number'
              placeholder='****1234'
              className='col-span-3'
              value={form.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='account-type' className='text-right'>
              Tipo
            </Label>
            <Select
              value={form.type}
              onValueChange={(value) => handleChange('type', value)}
            >
              <SelectTrigger id='account-type' className='col-span-3'>
                <SelectValue placeholder='Seleccionar tipo de cuenta' />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='account-balance' className='text-right'>
              Saldo
            </Label>
            <div className='col-span-3 flex items-center'>
              <span className='mr-2'>{selectedBank?.currency || 'USD'}</span>
              <Input
                id='account-balance'
                type='number'
                placeholder='0.00'
                className='flex-1'
                value={form.balance}
                onChange={(e) => handleChange('balance', e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>
            {mode === 'edit' ? 'Guardar Cambios' : 'Agregar Cuenta'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
