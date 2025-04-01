'use client'

import Image from 'next/image'
import { ChevronRight, Globe, MoreHorizontal, Search } from 'lucide-react'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import { Input } from '@/components/common/ui/input'
import { ScrollArea } from '@/components/common/ui/scroll-area'
import { BankListProps } from './types'

export function BankList({
  banks,
  selectedBankId,
  onSelectBank,
  onEditBank,
  onDeleteBank,
}: BankListProps) {
  return (
    <Card className='lg:col-span-4'>
      <CardHeader>
        <CardTitle>Bancos</CardTitle>
        <CardDescription>
          Seleccione un banco para ver sus cuentas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative mb-4'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Buscar bancos...'
            className='w-full pl-8'
          />
        </div>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-4'>
            {banks.map((bank) => {
              const isSelected = selectedBankId === bank.id
              return (
                <div
                  key={bank.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${isSelected ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                >
                  <div
                    className='flex-1 flex items-center gap-3 min-w-0 overflow-hidden'
                    onClick={() => onSelectBank(bank.id)}
                  >
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background'>
                      <Image
                        src={bank.logo || '/placeholder.svg'}
                        alt={bank.name}
                        width={40}
                        height={40}
                        className='rounded-md'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium leading-none truncate'>
                        {bank.name}
                      </p>
                      <div className='flex items-center text-xs text-muted-foreground mt-1'>
                        <Globe className='mr-1 h-3 w-3 shrink-0' />
                        <span className='truncate'>{bank.country}</span>
                        <span className='mx-1 shrink-0'>•</span>
                        <span className='shrink-0'>{bank.currency}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className='h-4 w-4 text-primary shrink-0' />
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0 shrink-0'>
                        <span className='sr-only'>Abrir menú</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEditBank(bank)}>
                        Editar Banco
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='text-destructive'
                        onClick={() => onDeleteBank(bank)}
                      >
                        Eliminar Banco
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
