'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { ACCOUNTS_MOCK } from './constants'
import { AccountFilterProps } from './types'

export function AccountFilter({
  value,
  onChange,
  accounts = ACCOUNTS_MOCK,
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
