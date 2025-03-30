'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CategoryFilterProps } from './types'

const defaultCategories = [
  'Todas las categorías',
  'Empleo',
  'Autónomo',
  'Inversión',
  'Inmobiliario',
  'Gobierno',
  'Personal',
]

export function CategoryFilter({
  value,
  onChange,
  categories = defaultCategories,
}: CategoryFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder='Categoría' />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
