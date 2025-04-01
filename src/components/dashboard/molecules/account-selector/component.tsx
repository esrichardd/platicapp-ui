'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { AccountSelectorProps } from './types'

export function AccountSelector({
  selectedAccount,
  onChange,
}: AccountSelectorProps) {
  return (
    <Select value={selectedAccount} onValueChange={onChange}>
      <SelectTrigger className='w-full md:w-[180px]'>
        <SelectValue placeholder='Seleccionar cuenta' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todas las cuentas</SelectItem>
        <SelectItem value='main'>Cuenta Principal</SelectItem>
        <SelectItem value='savings'>Ahorros</SelectItem>
        <SelectItem value='credit'>Tarjeta de Crédito</SelectItem>
      </SelectContent>
    </Select>
  )
}
