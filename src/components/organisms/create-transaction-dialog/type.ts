export type TransactionInput = {
  description: string
  amount: number
  category: string
  account: string
  date: string
}

export type CreateTransactionDialogProps = {
  type: 'income' | 'expense'
  onCreate: (data: TransactionInput) => void
}
