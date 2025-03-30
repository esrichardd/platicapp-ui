export type TransactionType = 'income' | 'expense'

export type Transaction = {
  id: number
  type: TransactionType
  description: string
  amount: number
  category: string
  account: string
  date: string
  status: string
}

export type TransactionInput = Omit<Transaction, 'id' | 'status'>
