'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import { Input } from '@/components/common/ui/input'
import { Label } from '@/components/common/ui/label'

export function PasswordChangeCard() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const handleChangePassword = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    console.log('Cambiando contraseña:', {
      current: form.currentPassword,
      new: form.newPassword,
    })

    // Aquí iría tu lógica para llamar al backend

    setSuccess(true)
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar Contraseña</CardTitle>
        <CardDescription>
          Actualiza tu contraseña para mantener tu cuenta segura.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='currentPassword'>Contraseña Actual</Label>
          <Input
            id='currentPassword'
            type='password'
            value={form.currentPassword}
            onChange={(e) => handleChange('currentPassword', e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='newPassword'>Nueva Contraseña</Label>
            <Input
              id='newPassword'
              type='password'
              value={form.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirmar Nueva Contraseña</Label>
            <Input
              id='confirmPassword'
              type='password'
              value={form.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {success && (
          <p className='text-sm text-green-600'>¡Contraseña actualizada!</p>
        )}
        <div className='ml-auto'>
          <Button onClick={handleChangePassword}>
            <Save className='mr-2 h-4 w-4' />
            Cambiar Contraseña
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
