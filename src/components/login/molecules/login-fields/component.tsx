import { TextInput } from '@/components/common/atoms'
import { LoginFieldsProps } from './types'

export function LoginFields({
  email,
  setEmail,
  password,
  setPassword,
}: LoginFieldsProps) {
  return (
    <div className='grid gap-6'>
      <TextInput
        id='email'
        label='Correo electrónico'
        type='email'
        placeholder='m@example.com'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        id='password'
        label='Contraseña'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )
}
