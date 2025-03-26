'use client'

import { useState } from 'react'
import { cn } from '@/lib/helpers/shadcn-utils'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { SocialLogin } from '@/components/molecules'
import { register } from '@/services/auth/register'
import { TermsAndConditions, TextDivider } from '@/components/atoms'
import { RegisterFields } from './fields'
import { RegisterActions } from './actions'

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    setPasswordError('')
    await register({ email: formData.email, password: formData.password })
    setIsLoading(false)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Crear una cuenta</CardTitle>
          <CardDescription>
            Regístrate con tu cuenta de Apple o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className='grid gap-6'>
              <SocialLogin />
              <TextDivider text='O continua con' />
              <RegisterFields
                formData={formData}
                handleChange={handleChange}
                passwordError={passwordError}
              />
              <RegisterActions isLoading={isLoading} />
            </div>
          </form>
        </CardContent>
      </Card>
      <TermsAndConditions />
    </div>
  )
}
