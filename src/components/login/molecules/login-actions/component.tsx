import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/common/ui/button'
import { LoginActionsProps } from './types'

export function LoginActions({ isLoading }: LoginActionsProps) {
  const t = useTranslations('loginActions')

  return (
    <div className='grid gap-6'>
      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className='animate-spin' />
            {t('loading')}
          </>
        ) : (
          t('signIn')
        )}
      </Button>
      <div className='text-center text-sm'>
        {t('noAccount')}
        <Link href='/register' className='underline underline-offset-4'>
          {t('register')}
        </Link>
      </div>
    </div>
  )
}
