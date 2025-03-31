export type Account = {
  id: number
  bankId: number
  name: string
  accountNumber: string
  type: string
  balance: number
  currency: string
}

export type AccountInput = Omit<Account, 'id'>
