'use client'

import { useState } from 'react'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import { Separator } from '@/components/common/ui/separator'

export function LinkedAccountsCard() {
  const [linkedAccounts, setLinkedAccounts] = useState({
    google: true,
    apple: false,
  })

  const toggleLink = (account: 'google' | 'apple') => {
    setLinkedAccounts((prev) => ({
      ...prev,
      [account]: !prev[account],
    }))

    console.log(
      `${linkedAccounts[account] ? 'Desvinculando' : 'Vinculando'} ${account}`,
    )

    // Aquí podrías invocar tu lógica de backend para sincronizar
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuentas Vinculadas</CardTitle>
        <CardDescription>
          Conecta tu cuenta con otros servicios para un inicio de sesión más
          fácil.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Google */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-red-600'
              >
                <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z'></path>
                <path d='M15.5 8.5L8.5 15.5'></path>
                <path d='M8.5 8.5l7 7'></path>
              </svg>
            </div>
            <div>
              <p className='font-medium'>Google</p>
              <p className='text-sm text-muted-foreground'>
                {linkedAccounts.google ? 'Conectado' : 'No conectado'}
              </p>
            </div>
          </div>
          <Button
            variant={linkedAccounts.google ? 'outline' : 'default'}
            onClick={() => toggleLink('google')}
          >
            {linkedAccounts.google ? 'Desconectar' : 'Conectar'}
          </Button>
        </div>

        <Separator />

        {/* Apple */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-slate-600'
              >
                <path d='M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z'></path>
                <path d='M10 2c1 .5 2 2 2 5'></path>
              </svg>
            </div>
            <div>
              <p className='font-medium'>Apple</p>
              <p className='text-sm text-muted-foreground'>
                {linkedAccounts.apple ? 'Conectado' : 'No conectado'}
              </p>
            </div>
          </div>
          <Button
            variant={linkedAccounts.apple ? 'outline' : 'default'}
            onClick={() => toggleLink('apple')}
          >
            {linkedAccounts.apple ? 'Desconectar' : 'Conectar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
