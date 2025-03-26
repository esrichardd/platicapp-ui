'use client'

import { useState } from 'react'
import { login } from '@/services/auth/login'
import { cn } from '@/lib/helpers/shadcn-utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TermsAndConditions, TextDivider } from '@/components/atoms'
import { SocialLogin } from '@/components/molecules'
import { LoginActions } from './actions'
import { LoginFields } from './fields'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await login({ email, password })
    setIsLoading(false)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Apple o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className='grid gap-6'>
              <SocialLogin />
              <TextDivider text='O continua con' />
              <LoginFields
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
              <LoginActions isLoading={isLoading} />
            </div>
          </form>
        </CardContent>
      </Card>
      <TermsAndConditions />
    </div>
  )
}
