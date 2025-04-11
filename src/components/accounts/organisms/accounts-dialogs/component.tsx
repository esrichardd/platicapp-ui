import { useBanksContext } from '@/lib/context/banks'
import {
  AccountDialog,
  BankDialog,
  DeleteAccountDialog,
  DeleteBankDialog,
} from '@/components/accounts/molecules'

export function AccountsDialogs() {
  const {
    isCreateBankOpen,
    isCreateAccountOpen,
    editBank,
    deleteBank,
    deleteAccount,
    editAccount,
    setIsCreateBankOpen,
    setIsCreateAccountOpen,
    setEditBank,
    setDeleteBank,
    setDeleteAccount,
    setEditAccount,
    handleSubmitBank,
    handleDeleteBank,
    handleSubmitAccount,
    handleDeleteAccount,
    selectedBank,
    accounts,
  } = useBanksContext()

  return (
    <>
      <BankDialog
        open={isCreateBankOpen || !!editBank}
        onOpenChange={(v) => {
          if (!v) setEditBank(null)
          setIsCreateBankOpen(v)
        }}
        onSubmit={handleSubmitBank}
        initialData={editBank || undefined}
        mode={editBank ? 'edit' : 'create'}
      />

      <DeleteBankDialog
        open={!!deleteBank}
        onOpenChange={() => setDeleteBank(null)}
        bank={deleteBank}
        accounts={accounts}
        onDelete={handleDeleteBank}
      />

      <AccountDialog
        open={isCreateAccountOpen || !!editAccount}
        onOpenChange={(v) => {
          if (!v) setEditAccount(null)
          setIsCreateAccountOpen(v)
        }}
        onSubmit={handleSubmitAccount}
        selectedBank={selectedBank}
        initialData={editAccount || undefined}
        mode={editAccount ? 'edit' : 'create'}
      />

      <DeleteAccountDialog
        open={!!deleteAccount}
        onOpenChange={() => setDeleteAccount(null)}
        account={deleteAccount}
        onDelete={handleDeleteAccount}
      />
    </>
  )
}
