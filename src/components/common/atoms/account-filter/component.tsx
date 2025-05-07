'use client'

import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { AccountFilterProps } from './types'

export function AccountFilter({
  value,
  onChange,
  accounts,
}: AccountFilterProps) {
  const t = useTranslations('transactions.filters')

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder={t('account')} />
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
