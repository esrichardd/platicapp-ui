import { Transaction } from '@/lib/sdk-types'

export const EXPENSES_MOCK: Transaction[] = [
  {
    id: 1,
    type: 'expense',
    description: 'Alquiler mensual',
    category: 'Vivienda',
    amount: 800.0,
    date: '2023-06-01',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 2,
    type: 'expense',
    description: 'Compra de supermercado',
    category: 'Alimentación',
    amount: 150.0,
    date: '2023-06-05',
    account: 'Ahorros',
    status: 'Pendiente',
  },
  {
    id: 3,
    type: 'expense',
    description: 'Gasolina',
    category: 'Transporte',
    amount: 60.0,
    date: '2023-06-07',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 4,
    type: 'expense',
    description: 'Internet y teléfono',
    category: 'Servicios',
    amount: 55.0,
    date: '2023-06-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
]
