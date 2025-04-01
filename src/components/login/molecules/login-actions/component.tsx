import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/common/ui/button'
import { LoginActionsProps } from './types'

export function LoginActions({ isLoading }: LoginActionsProps) {
  return (
    <div className='grid gap-6'>
      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className='animate-spin' />
            Cargando
          </>
        ) : (
          'Iniciar sesión'
        )}
      </Button>
      <div className='text-center text-sm'>
        ¿No tienes una cuenta?{' '}
        <Link href='/register' className='underline underline-offset-4'>
          Regístrate
        </Link>
      </div>
    </div>
  )
}
