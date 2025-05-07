'use client'

import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { StatusFilterProps } from './types'

export function StatusFilter({ value, onChange, statuses }: StatusFilterProps) {
  const t = useTranslations('transactions.filters')

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder={t('status')} />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
