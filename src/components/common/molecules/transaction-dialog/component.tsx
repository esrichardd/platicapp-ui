'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useBankAccountsQuery } from '@/lib/queries/bank-accounts'
import { useCategoriesQuery } from '@/lib/queries/categories'
import { useSubcategoriesQuery } from '@/lib/queries/subcategories'
import { TransactionInput } from '@/lib/sdk-types'
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
import { TransactionDialogProps } from './types'

export function TransactionDialog({
  type,
  mode,
  onSubmit,
  initialData,
  open,
  onOpenChange,
}: TransactionDialogProps) {
  const t = useTranslations('transactions.dialog')
  const { data: categories = [] } = useCategoriesQuery()
  const { data: bankAccounts = [] } = useBankAccountsQuery()
  const { data: subcategories = [] } = useSubcategoriesQuery()

  const [form, setForm] = useState<TransactionInput>({
    description: '',
    amount: 0,
    category_id: '',
    bank_account_id: '',
    subcategory_id: '',
    date: '',
    type: type,
  })

  // Nuevo estado para el raw value de amount
  const [rawAmount, setRawAmount] = useState('')

  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      setForm(initialData)
      setRawAmount(String(Math.round((initialData.amount || 0) * 100)))
    } else if (!open && mode === 'create') {
      setForm({
        description: '',
        amount: 0,
        category_id: '',
        bank_account_id: '',
        subcategory_id: '',
        date: '',
        type: type,
      })
      setRawAmount('')
    }
  }, [open, mode, initialData, type])

  const handleChange = (
    field: keyof TransactionInput,
    value: string | number,
  ) => {
    if (field === 'date') {
      setForm((prev) => ({
        ...prev,
        [field]: value as string,
      }))
    } else {
      setForm((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = () => {
    if (
      !form.amount ||
      !form.category_id ||
      !form.bank_account_id ||
      !form.date
    ) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    if (form.amount < 1) {
      alert('La cantidad debe ser mayor o igual a 1')
      return
    }

    console.log({
      amount: form.amount,
      bank_account_id: form.bank_account_id,
      category_id: form.category_id,
      date: form.date,
      description: form.description,
      subcategory_id: form.subcategory_id,
      type: form.type,
    })

    onSubmit({
      amount: form.amount,
      bank_account_id: form.bank_account_id,
      category_id: form.category_id,
      date: form.date,
      description: form.description,
      subcategory_id: form.subcategory_id,
      type: form.type,
    })
    onOpenChange?.(false)
  }

  const capitalizedType = type === 'INCOME' ? 'Ingreso' : 'Gasto'
  const actionLabel = mode === 'create' ? 'Agregar' : 'Editar'

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category_id === form.category_id,
  )

  // Formateador para mostrar el monto como dinero
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Calcular el valor numérico a partir del rawAmount
  const getAmountFromRaw = (raw: string) => {
    if (!raw) return 0
    return parseInt(raw, 10) / 100
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {actionLabel} {capitalizedType}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? t(`${type.toLowerCase()}.create.description`)
              : t(`${type.toLowerCase()}.edit.description`)}
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              {t('description')}
            </Label>
            <Input
              id='description'
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className='col-span-3 w-full'
              placeholder={t('descriptionPlaceholder')}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='amount' className='text-right'>
              {t('amount')}
            </Label>
            <Input
              id='amount'
              type='text'
              min={1}
              value={formatAmount(getAmountFromRaw(rawAmount))}
              onChange={(e) => {
                // Solo permitir dígitos
                const digits = e.target.value.replace(/\D/g, '')
                setRawAmount(digits)
                handleChange('amount', getAmountFromRaw(digits))
              }}
              className='col-span-3 w-full'
              inputMode='numeric'
              pattern='[0-9]*'
              maxLength={15}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>{t('category')}</Label>
            <Select
              value={form.category_id}
              onValueChange={(val) => {
                handleChange('category_id', val)
                handleChange('subcategory_id', '') // Reset subcategory when category changes
              }}
            >
              <SelectTrigger className='col-span-3 w-full'>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {form.category_id && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>{t('subcategory')}</Label>
              <Select
                value={form.subcategory_id}
                onValueChange={(val) => handleChange('subcategory_id', val)}
              >
                <SelectTrigger className='col-span-3 w-full'>
                  <SelectValue placeholder={t('selectSubcategory')} />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>{t('account')}</Label>
            <Select
              value={form.bank_account_id}
              onValueChange={(val) => handleChange('bank_account_id', val)}
            >
              <SelectTrigger className='col-span-3 w-full'>
                <SelectValue placeholder={t('selectAccount')} />
              </SelectTrigger>
              <SelectContent>
                {bankAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='date' className='text-right'>
              {t('date')}
            </Label>
            <Input
              id='date'
              type='date'
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className='col-span-3 w-full'
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === 'create' ? t('save') : t('update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
