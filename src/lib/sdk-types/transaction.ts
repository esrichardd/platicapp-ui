import { Account } from './account'
import { Category } from './category'
import { Subcategory } from './subcategory'

export interface Transaction {
  id: string
  user_id: string
  bank_account_id: string
  category_id: string
  subcategory_id?: string
  description?: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  date: string
  created_at: string
  updated_at: string
}

export type TransactionInput = Omit<
  Transaction,
  'id' | 'user_id' | 'created_at' | 'updated_at'
>

export type TransactionWithRelations = Transaction & {
  category: Category
  subcategory: Subcategory
  bank_account: Account
}
