import { TextInput } from '@/components/common/atoms'
import { RegisterFieldsProps } from './type'

export function RegisterFields({
  registerProperties,
  handleChange,
  passwordError,
}: RegisterFieldsProps) {
  return (
    <div className='grid gap-6'>
      <TextInput
        id='name'
        label='Nombre completo'
        type='text'
        placeholder='Juan Pérez'
        value={registerProperties.name}
        onChange={handleChange}
        required
      />
      <TextInput
        id='email'
        label='Correo electrónico'
        type='email'
        placeholder='m@example.com'
        value={registerProperties.email}
        onChange={handleChange}
        required
      />
      <TextInput
        id='password'
        label='Contraseña'
        type='password'
        value={registerProperties.password}
        onChange={handleChange}
        required
      />
      <TextInput
        id='confirmPassword'
        label='Confirmar contraseña'
        type='password'
        value={registerProperties.confirmPassword}
        onChange={handleChange}
        required
        error={passwordError}
      />
    </div>
  )
}
