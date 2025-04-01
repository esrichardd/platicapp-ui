'use client'

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
import { LoginActions, LoginFields } from '@/components/login/molecules'
import { useLoginLogic } from './use-login-logic'

export function LoginTemplate({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  const { loginProperties, setLoginProperties, isLoading, handleLogin } =
    useLoginLogic()

  return (
    <div className={cn('flex flex-col gap-6', className)}>
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
                email={loginProperties.email}
                setEmail={(email) =>
                  setLoginProperties({ ...loginProperties, email })
                }
                password={loginProperties.password}
                setPassword={(password) =>
                  setLoginProperties({ ...loginProperties, password })
                }
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
