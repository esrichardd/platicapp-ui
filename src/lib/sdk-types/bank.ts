export type Bank = {
  id: string
  name: string
  country: string
  currency: string
  image_url?: string
}

export type BankInput = Omit<Bank, 'id'>
