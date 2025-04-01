export type RegisterProperties = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterFieldsProps = {
  registerProperties: RegisterProperties
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  passwordError: string
}
