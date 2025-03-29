'use client'

import { useState } from 'react'
import { AccountSelector } from '@/components/molecules'
import { FinancialSummary } from './dashboard-financial-summary'
import { QuickActions } from './quick-actions'
import { RecentTransactions } from './recent-transactions'

const recentTransactions = [
  {
    id: 1,
    description: 'Grocery Shopping',
    category: 'Food',
    amount: -120.5,
    date: '2023-06-15',
    account: 'Main Account',
  },
  {
    id: 2,
    description: 'Salary',
    category: 'Income',
    amount: 3500.0,
    date: '2023-06-10',
    account: 'Main Account',
  },
  {
    id: 3,
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -15.99,
    date: '2023-06-08',
    account: 'Credit Card',
  },
  {
    id: 4,
    description: 'Freelance Work',
    category: 'Income',
    amount: 850.0,
    date: '2023-06-05',
    account: 'Savings',
  },
  {
    id: 5,
    description: 'Restaurant',
    category: 'Food',
    amount: -65.3,
    date: '2023-06-03',
    account: 'Credit Card',
  },
]

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
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </main>
  )
}
