import { useBankAccountsQuery } from '@/lib/queries/bank-accounts'
import { useCategoriesQuery } from '@/lib/queries/categories'

export function useTransactionFiltersData() {
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategoriesQuery()

  const {
    data: accounts = [],
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
  } = useBankAccountsQuery()

  const categoryOptions = [
    'Todas las categorías',
    ...categories.map((category) => category.name),
  ]

  const accountOptions = [
    'Todas las cuentas',
    ...accounts.map((account) => account.account_name),
  ]

  const statusOptions = ['Todos los estados', 'INCOME', 'EXPENSE']

  return {
    categoryOptions,
    accountOptions,
    statusOptions,
    isLoading: isLoadingCategories || isLoadingAccounts,
    isError: isErrorCategories || isErrorAccounts,
  }
}
