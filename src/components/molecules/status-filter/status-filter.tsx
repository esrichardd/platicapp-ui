'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusFilterProps } from './type'

const defaultStatuses = ['Todos los estados', 'Completado', 'Pendiente']

export function StatusFilter({
  value,
  onChange,
  statuses = defaultStatuses,
}: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder='Estado' />
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
