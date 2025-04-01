import { cn } from '@/lib/helpers/shadcn-utils'
import { Input } from '@/components/common/ui/input'
import { Label } from '@/components/common/ui/label'
import { TextInputProps } from './types'

export function TextInput({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
  error,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className='grid gap-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        {...props}
      />
      {error && <p className='text-destructive text-sm'>{error}</p>}
    </div>
  )
}
