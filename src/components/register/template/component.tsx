'use client'

import { useState } from 'react'
import { register } from '@/services/auth/register'
import { cn } from '@/lib/helpers/shadcn-utils'
import { TermsAndConditions, TextDivider } from '@/components/common/atoms'
import { SocialLogin } from '@/components/common/molecules'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import {
  RegisterActions,
  RegisterFields,
} from '@/components/register/molecules'

export function RegisterTemplate({
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
                registerProperties={formData}
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
