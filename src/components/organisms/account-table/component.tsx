'use client'

import { CreditCard, MoreHorizontal, Plus, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { AccountTableProps } from './type'

export function AccountTable({
  selectedBank,
  accounts,
  onCreateAccount,
  onEditAccount,
  onDeleteAccount,
  onViewTransactions,
}: AccountTableProps) {
  if (!selectedBank) {
    return (
      <Card className='lg:col-span-8 overflow-hidden'>
        <CardContent className='flex h-[300px] flex-col items-center justify-center border border-dashed rounded-lg p-8 text-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
            <Wallet className='h-10 w-10 text-muted-foreground' />
          </div>
          <h3 className='mt-4 text-lg font-semibold'>
            No hay banco seleccionado
          </h3>
          <p className='mt-2 text-sm text-muted-foreground'>
            Selecciona un banco de la lista para ver sus cuentas o agrega un
            nuevo banco.
          </p>
          <Button className='mt-4' variant='outline' onClick={onCreateAccount}>
            <Plus className='mr-2 h-4 w-4' /> Agregar Banco
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='lg:col-span-8 overflow-hidden'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Cuentas</CardTitle>
            <CardDescription>
              {`Gestione sus cuentas en ${selectedBank.name}`}
            </CardDescription>
          </div>
          <Badge variant='outline'>
            {accounts.length} {accounts.length === 1 ? 'cuenta' : 'cuentas'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='overflow-x-auto'>
        {accounts.length > 0 ? (
          <div className='w-full overflow-x-auto'>
            <Table className='w-full table-fixed'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[30%] min-w-[120px]'>
                    Nombre de la Cuenta
                  </TableHead>
                  <TableHead className='hidden md:table-cell w-[20%]'>
                    Número de Cuenta
                  </TableHead>
                  <TableHead className='hidden md:table-cell w-[15%]'>
                    Tipo
                  </TableHead>
                  <TableHead className='w-[25%] text-right min-w-[100px]'>
                    Saldo
                  </TableHead>
                  <TableHead className='w-[10%] min-w-[40px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className='font-medium truncate'>
                      {account.name}
                    </TableCell>
                    <TableCell className='hidden md:table-cell truncate'>
                      {account.accountNumber}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <Badge variant='outline'>{account.type}</Badge>
                    </TableCell>
                    <TableCell className='text-right font-medium whitespace-nowrap'>
                      {account.currency} {account.balance.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Abrir menú</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          {onEditAccount && (
                            <DropdownMenuItem
                              onClick={() => onEditAccount(account)}
                            >
                              Editar Cuenta
                            </DropdownMenuItem>
                          )}
                          {onViewTransactions && (
                            <DropdownMenuItem
                              onClick={() => onViewTransactions(account)}
                            >
                              Ver Transacciones
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {onDeleteAccount && (
                            <DropdownMenuItem
                              className='text-destructive'
                              onClick={() => onDeleteAccount(account)}
                            >
                              Eliminar Cuenta
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
              <CreditCard className='h-10 w-10 text-muted-foreground' />
            </div>
            <h3 className='mt-4 text-lg font-semibold'>
              No se encontraron cuentas
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Aún no tiene cuentas con este banco.
            </p>
            <Button className='mt-4' onClick={onCreateAccount}>
              <Plus className='mr-2 h-4 w-4' /> Agregar Cuenta
            </Button>
          </div>
        )}
      </CardContent>
      {accounts.length > 0 && (
        <CardFooter className='flex justify-between'>
          <div>
            <p className='text-sm text-muted-foreground'>
              Saldo Total:{' '}
              <span className='font-medium'>
                {selectedBank.currency}{' '}
                {accounts.reduce((sum, a) => sum + a.balance, 0).toFixed(2)}
              </span>
            </p>
          </div>
          <Button variant='outline' size='sm' onClick={onCreateAccount}>
            <Plus className='mr-2 h-4 w-4' /> Agregar Cuenta
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
