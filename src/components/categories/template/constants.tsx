import { Category, Subcategory } from '@/lib/sdk-types'

export const CATEGORIES_MOCK: Category[] = [
  {
    id: 1,
    name: 'Vivienda',
    icon: 'Hogar',
    color: '#60a5fa',
    description: 'Gastos del hogar',
  },
  {
    id: 2,
    name: 'Transporte',
    icon: 'Transporte',
    color: '#4ade80',
    description: 'Movilidad',
  },
]

export const SUBCATEGORIES_MOCK: Subcategory[] = [
  {
    id: 1,
    name: 'Alquiler',
    icon: 'Hogar',
    color: '#60a5fa',
    description: 'Pago mensual',
    parentCategoryId: 1,
  },
  {
    id: 2,
    name: 'Servicios',
    icon: 'Otro',
    color: '#93c5fd',
    description: 'Luz, agua, etc.',
    parentCategoryId: 1,
  },
  {
    id: 3,
    name: 'Gasolina',
    icon: 'Transporte',
    color: '#86efac',
    description: 'Combustible',
    parentCategoryId: 2,
  },
]
