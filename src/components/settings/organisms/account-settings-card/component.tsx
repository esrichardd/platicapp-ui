'use client'

import { useState } from 'react'
import { Camera, Mail, Save } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/common/ui/avatar'
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

export function AccountSettingsCard() {
  const [accountInfo, setAccountInfo] = useState({
    email: 'john.doe@example.com',
    avatar: '/placeholder-user.jpg',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setAccountInfo((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const handleSave = () => {
    console.log('Guardando configuración de cuenta:', accountInfo)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      handleChange('avatar', imageUrl)
    }
  }

  const initials = () => {
    const [first, last] = accountInfo.email.split('@')[0].split('.')
    return `${first?.charAt(0) ?? ''}${last?.charAt(0) ?? ''}`.toUpperCase()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foto de Perfil</CardTitle>
        <CardDescription>
          Actualiza tu foto de perfil. Esta se mostrará en toda la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <Avatar className='h-24 w-24'>
            <AvatarImage src={accountInfo.avatar} alt='Foto de perfil' />
            <AvatarFallback>{initials()}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='avatar' className='cursor-pointer'>
              <div className='flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 hover:bg-accent'>
                <Camera className='h-4 w-4' />
                <span>Subir nueva foto</span>
              </div>
              <Input
                id='avatar'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleAvatarUpload}
              />
            </Label>
            <p className='text-xs text-muted-foreground'>
              Recomendado: JPG, PNG o GIF cuadrado, mínimo 300x300 píxeles.
            </p>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Correo Electrónico</Label>
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                className='pl-9'
                value={accountInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <Button variant='outline'>Verificar</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {success && (
          <p className='text-sm text-green-600'>¡Datos actualizados!</p>
        )}
        <div className='ml-auto'>
          <Button onClick={handleSave}>
            <Save className='mr-2 h-4 w-4' />
            Guardar Cambios
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
