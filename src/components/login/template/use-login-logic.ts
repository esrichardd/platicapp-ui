'use client'

import { useState } from 'react'
import { login } from '@/services/auth/login'
import { LoginProperties } from './type'

export function useLoginLogic() {
  const [loginProperties, setLoginProperties] = useState<LoginProperties>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await login(loginProperties)
    setIsLoading(false)
  }

  return {
    loginProperties,
    setLoginProperties,
    isLoading,
    handleLogin,
  }
}
