'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRightLeft, Copy, MoreHorizontal, Trash2 } from 'lucide-react'
import { TransactionInput, TransactionWithRelations } from '@/lib/sdk-types'
import { TransactionDialog } from '@/components/common/molecules'
import { Button } from '@/components/common/ui/button'
import { Checkbox } from '@/components/common/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/ui/table'
import { TransactionTableProps } from './type'

export function TransactionTable({
  transactions,
  selectedItems,
  onToggleSelect,
  onToggleSelectAll,
  onBulkAction,
  onEdit,
}: TransactionTableProps) {
  const t = useTranslations('transactions.table')

  const allSelected =
    transactions.length > 0 && selectedItems.length === transactions.length
  const [editingTransaction, setEditingTransaction] = useState<{
    id: string
    data: TransactionWithRelations
  } | null>(null)

  const handleEdit = (data: TransactionInput & { id: string }) => {
    onEdit?.(data.id, data)
    setEditingTransaction(null)
  }

  return (
    <div className='border rounded-md overflow-auto'>
      <div className='flex items-center justify-between px-4 py-2 border-b bg-muted'>
        <span className='text-sm font-medium'>
          {selectedItems.length} {t('selected')}
        </span>
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => onBulkAction?.('duplicate', selectedItems)}
            disabled={selectedItems.length === 0}
          >
            <Copy className='w-4 h-4 mr-1' />
            {t('duplicate')}
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={() => onBulkAction?.('transfer', selectedItems)}
            disabled={selectedItems.length === 0}
          >
            <ArrowRightLeft className='w-4 h-4 mr-1' />
            {t('transfer')}
          </Button>
          <Button
            size='sm'
            variant='destructive'
            onClick={() => onBulkAction?.('delete', selectedItems)}
            disabled={selectedItems.length === 0}
          >
            <Trash2 className='w-4 h-4 mr-1' />
            {t('delete')}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[40px] sticky left-0 bg-background'>
              <Checkbox
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            <TableHead>{t('description')}</TableHead>
            <TableHead className='hidden sm:table-cell'>
              {t('category')}
            </TableHead>
            <TableHead className='hidden sm:table-cell'>
              {t('subcategory')}
            </TableHead>
            <TableHead className='hidden sm:table-cell'>
              {t('account')}
            </TableHead>
            <TableHead className='hidden sm:table-cell'>{t('date')}</TableHead>
            <TableHead className='text-right'>{t('amount')}</TableHead>
            <TableHead className='w-[60px] sticky right-0 bg-background'>
              {t('actions')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className='h-24 text-center'>
                {t('noTransactions')}
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='sticky left-0 bg-background'>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => onToggleSelect(item.id)}
                  />
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='flex flex-col'>
                    <span className='truncate'>{item.description || ''}</span>
                    <span className='text-sm text-muted-foreground sm:hidden'>
                      {item.category.name} • {item.bank_account.account_name} •{' '}
                      {new Date(item.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {item.category.name}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {item.subcategory?.name || '-'}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {item.bank_account.account_name}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {new Date(item.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell className='text-right text-green-600 font-medium'>
                  $
                  {item.amount.toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className='sticky right-0 bg-background'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>{t('openMenu')}</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingTransaction({
                            id: item.id,
                            data: {
                              ...item,
                              type: item.type,
                              description: item.description,
                              amount: item.amount,
                              bank_account_id: item.bank_account_id,
                              category_id: item.category_id,
                              date: item.date,
                            },
                          })
                        }}
                      >
                        {t('edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem>{t('duplicate')}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='text-red-600'
                        onClick={() => onBulkAction?.('delete', [item.id])}
                      >
                        <Trash2 className='w-4 h-4 mr-2' />
                        {t('delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingTransaction && (
        <TransactionDialog
          type={editingTransaction.data.type}
          mode='edit'
          initialData={editingTransaction.data}
          open={true}
          onOpenChange={(open) => {
            if (!open) setEditingTransaction(null)
          }}
          onSubmit={(data) => {
            handleEdit({ ...data, id: editingTransaction.data.id })
            setEditingTransaction(null)
          }}
        />
      )}
    </div>
  )
}
