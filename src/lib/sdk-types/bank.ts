export type Bank = {
  id: number
  name: string
  country: string
  currency: string
  logo?: string
}

export type BankInput = Omit<Bank, 'id'>
