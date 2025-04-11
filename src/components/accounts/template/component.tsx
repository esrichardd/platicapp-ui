'use client'

import { AccountsHeader } from '@/components/accounts/molecules'
import {
  AccountsContent,
  AccountsDialogs,
} from '@/components/accounts/organisms'

export function AccountsTemplate() {
  return (
    <main className='flex-1 overflow-auto p-6'>
      <div className='grid gap-6'>
        <AccountsHeader />
        <AccountsContent />
      </div>
      <AccountsDialogs />
    </main>
  )
}
