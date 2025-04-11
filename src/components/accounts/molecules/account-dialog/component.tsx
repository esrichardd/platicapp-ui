'use client'

import { useEffect, useState } from 'react'
import { ACCOUNT_TYPES } from '@/lib/helpers/constants'
import { AccountInput } from '@/lib/sdk-types'
import { Button } from '@/components/common/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/ui/dialog'
import { Input } from '@/components/common/ui/input'
import { Label } from '@/components/common/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { AccountDialogProps } from './types'

export function AccountDialog({
  open,
  onOpenChange,
  onSubmit,
  selectedBank,
  initialData,
  mode,
}: AccountDialogProps) {
  const [form, setForm] = useState<AccountInput>({
    account_name: '',
    account_number: '',
    balance: 0,
    account_type: '',
    description: '',
    bank_id: '',
  })

  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      setForm(initialData)
    } else if (!open && mode === 'create') {
      setForm({
        account_name: '',
        account_number: '',
        account_type: '',
        description: '',
        balance: 0,
        bank_id: selectedBank?.id || '',
      })
    }
  }, [open, mode, initialData, selectedBank])

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (
      !form.account_name ||
      !form.account_number ||
      !form.account_type ||
      !form.balance
    ) {
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
              value={form.account_name}
              onChange={(e) => handleChange('account_name', e.target.value)}
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
              value={form.account_number}
              onChange={(e) => handleChange('account_number', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='account-type' className='text-right'>
              Tipo
            </Label>
            <Select
              value={form.account_type}
              onValueChange={(value) => handleChange('account_type', value)}
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
