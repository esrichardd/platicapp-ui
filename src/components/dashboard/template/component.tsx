'use client'

import { useState } from 'react'
import { Transaction } from '@/lib/sdk-types'
import {
  AccountSelector,
  FinancialSummary,
  QuickActions,
  RecentTransactions,
} from '@/components/dashboard/molecules'
import { RECENT_TRANSACTIONS } from './constants'

export function DashboardTemplate() {
  const [selectedAccount, setSelectedAccount] = useState('all')

  return (
    <main className='flex-1 overflow-auto p-4 md:p-6'>
      <div className='grid gap-4 md:gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center'>
          <h2 className='text-xl md:text-2xl font-bold tracking-tight'>
            Resumen Financiero
          </h2>
          <div className='w-full md:w-auto md:ml-auto flex items-center gap-2'>
            <AccountSelector
              selectedAccount={selectedAccount}
              onChange={setSelectedAccount}
            />
          </div>
        </div>

        <FinancialSummary />
        <QuickActions />
        <RecentTransactions
          transactions={RECENT_TRANSACTIONS as Transaction[]}
        />
      </div>
    </main>
  )
}
