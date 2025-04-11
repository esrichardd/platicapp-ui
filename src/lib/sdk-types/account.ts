export type Account = {
  id: string
  bank_id: string
  account_name: string
  account_number: string
  account_type: string
  description: string
  balance: number
}

export type AccountInput = Omit<Account, 'id'>
