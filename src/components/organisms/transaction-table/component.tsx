'use client'

import { ArrowRightLeft, Copy, MoreHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionTableProps } from './type'

export function TransactionTable({
  data,
  selectedItems,
  onToggleSelect,
  onToggleSelectAll,
  onBulkAction,
}: TransactionTableProps) {
  const allSelected = data.length > 0 && selectedItems.length === data.length

  return (
    <div className='border rounded-md overflow-auto'>
      {selectedItems.length > 0 && (
        <div className='flex items-center justify-between px-4 py-2 border-b bg-muted'>
          <span className='text-sm font-medium'>
            {selectedItems.length} elementos seleccionados
          </span>
          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onBulkAction?.('duplicate', selectedItems)}
            >
              <Copy className='w-4 h-4 mr-1' />
              Duplicar
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onBulkAction?.('transfer', selectedItems)}
            >
              <ArrowRightLeft className='w-4 h-4 mr-1' />
              Transferir
            </Button>
            <Button
              size='sm'
              variant='destructive'
              onClick={() => onBulkAction?.('delete', selectedItems)}
            >
              <Trash2 className='w-4 h-4 mr-1' />
              Eliminar
            </Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[40px] sticky left-0 bg-background'>
              <Checkbox
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead className='hidden sm:table-cell'>Categoría</TableHead>
            <TableHead className='hidden sm:table-cell'>Cuenta</TableHead>
            <TableHead className='hidden sm:table-cell'>Fecha</TableHead>
            <TableHead className='hidden sm:table-cell'>Estado</TableHead>
            <TableHead className='text-right'>Monto</TableHead>
            <TableHead className='w-[60px] sticky right-0 bg-background'>
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className='h-24 text-center'>
                No se encontraron transacciones.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='sticky left-0 bg-background'>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => onToggleSelect(item.id)}
                  />
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='flex flex-col'>
                    <span className='truncate'>{item.description}</span>
                    <span className='text-sm text-muted-foreground sm:hidden'>
                      {item.category} • {item.account} •{' '}
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {item.category}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {item.account}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge
                    variant={
                      item.status === 'Completado' ? 'default' : 'secondary'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right text-green-600 font-medium'>
                  ${item.amount.toFixed(2)}
                </TableCell>
                <TableCell className='sticky right-0 bg-background'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='text-red-600'>
                        <Trash2 className='w-4 h-4 mr-2' />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
