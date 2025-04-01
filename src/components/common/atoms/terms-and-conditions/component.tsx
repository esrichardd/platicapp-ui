import Link from 'next/link'

export function TermsAndConditions() {
  return (
    <div className='text-muted-foreground text-center text-xs'>
      Al registrarte, aceptas nuestros{' '}
      <Link href='#' className='underline underline-offset-4'>
        Términos de servicio
      </Link>{' '}
      y nuestra{' '}
      <Link href='#' className='underline underline-offset-4'>
        Política de privacidad
      </Link>
      .
    </div>
  )
}
