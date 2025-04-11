import { useBanksContext } from '@/lib/context/banks'
import { AccountTable, BankList } from '@/components/accounts/organisms'

export function AccountsContent() {
  const {
    banks,
    selectedBankId,
    setSelectedBankId,
    setEditBank,
    setDeleteBank,
    filteredAccounts,
    selectedBank,
    setIsCreateAccountOpen,
    setDeleteAccount,
    setEditAccount,
    // isLoadingBanks,
    // isLoadingAccounts,
  } = useBanksContext()

  return (
    <div className='grid gap-6 lg:grid-cols-12'>
      <BankList
        banks={banks}
        selectedBankId={selectedBankId}
        onSelectBank={setSelectedBankId}
        onEditBank={setEditBank}
        onDeleteBank={setDeleteBank}
        // isLoading={isLoadingBanks}
      />
      <AccountTable
        accounts={filteredAccounts}
        selectedBank={selectedBank}
        onCreateAccount={() => setIsCreateAccountOpen(true)}
        onDeleteAccount={setDeleteAccount}
        onEditAccount={setEditAccount}
        // isLoading={isLoadingAccounts}
      />
    </div>
  )
}
