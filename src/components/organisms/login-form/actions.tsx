import { Button } from '@/components/ui/button'
import Link from 'next/link'

type LoginActionsProps = {
  isLoading: boolean
}

export function LoginActions({ isLoading }: LoginActionsProps) {
  return (
    <div className='grid gap-6'>
      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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
