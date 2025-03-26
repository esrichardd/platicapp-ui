import { Button } from '@/components/ui/button'
import { SocialLoginButtonProps } from './types'

export function SocialLoginButton({ icon, text }: SocialLoginButtonProps) {
  return (
    <Button variant='outline' className='flex w-full gap-2' disabled={true}>
      {icon}
      {text}
    </Button>
  )
}
