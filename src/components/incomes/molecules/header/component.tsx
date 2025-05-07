'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRightLeft, Copy, Plus, Trash2 } from 'lucide-react'
import type { TransactionInput } from '@/lib/sdk-types'
import { TransactionDialog } from '@/components/common/molecules'
import { Button } from '@/components/common/ui/button'

type IncomesHeaderProps = {
  isCreateOpen: boolean
  setIsCreateOpen: Dispatch<SetStateAction<boolean>>
  selectedItems: string[]
  handleBulkAction: (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: string[],
  ) => void
  handleCreate: (data: TransactionInput) => Promise<void>
}

export function IncomesHeader({
  isCreateOpen,
  setIsCreateOpen,
  selectedItems,
  handleBulkAction,
  handleCreate,
}: IncomesHeaderProps) {
  const t = useTranslations('incomes.header')
  const hasSelectedItems = selectedItems.length > 0

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex gap-2'>
        <Button
          className='w-full sm:w-auto'
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className='mr-2 h-4 w-4' />
          {t('create')}
        </Button>

        {hasSelectedItems && (
          <>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkAction('delete', selectedItems)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkAction('duplicate', selectedItems)}
            >
              <Copy className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkAction('transfer', selectedItems)}
            >
              <ArrowRightLeft className='h-4 w-4' />
            </Button>
          </>
        )}
      </div>

      <TransactionDialog
        type='INCOME'
        mode='create'
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={(data) => {
          handleCreate(data)
          setIsCreateOpen(false)
        }}
      />
    </div>
  )
}
