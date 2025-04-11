import { Plus } from 'lucide-react'
import { useBanksContext } from '@/lib/context/banks'
import { Button } from '@/components/common/ui/button'

export function AccountsHeader() {
  const { selectedBankId, setIsCreateBankOpen, setIsCreateAccountOpen } =
    useBanksContext()

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
      <h2 className='text-2xl font-bold tracking-tight'>Cuentas</h2>
      <div className='ml-auto flex flex-wrap gap-2 sm:flex-row sm:items-center'>
        <Button variant='outline' onClick={() => setIsCreateBankOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> Agregar Banco
        </Button>
        <Button
          disabled={!selectedBankId}
          onClick={() => setIsCreateAccountOpen(true)}
        >
          <Plus className='mr-2 h-4 w-4' /> Agregar Cuenta
        </Button>
      </div>
    </div>
  )
}
