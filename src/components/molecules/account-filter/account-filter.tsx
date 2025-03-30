'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AccountFilterProps } from './type'

const defaultAccounts = [
  'Todas las cuentas',
  'Cuenta principal',
  'Ahorros',
  'Cuenta de inversión',
]

export function AccountFilter({
  value,
  onChange,
  accounts = defaultAccounts,
}: AccountFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder='Cuenta' />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account} value={account}>
            {account}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
