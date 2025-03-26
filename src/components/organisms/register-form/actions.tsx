import Link from 'next/link'
import { Button } from '@/components/ui/button'

type RegisterActionsProps = {
  isLoading: boolean
}

export function RegisterActions({ isLoading }: RegisterActionsProps) {
  return (
    <div className='grid gap-6'>
      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </Button>
      <div className='text-center text-sm'>
        ¿Ya tienes una cuenta?{' '}
        <Link href='/login' className='underline underline-offset-4'>
          Inicia sesión
        </Link>
      </div>
    </div>
  )
}
