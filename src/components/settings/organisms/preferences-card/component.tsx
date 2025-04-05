'use client'

import { useState } from 'react'
import { Moon, Save, Settings, Sun } from 'lucide-react'
import { CURRENCIES, LANGUAGES } from '@/lib/helpers/constants'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import { Label } from '@/components/common/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { Switch } from '@/components/common/ui/switch'

export function PreferencesCard() {
  const [preferences, setPreferences] = useState({
    currency: 'USD',
    language: 'en',
    theme: 'system',
    emailNotifications: true,
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const handleSave = () => {
    console.log('Guardando preferencias:', preferences)
    // Aquí iría la lógica de persistencia
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de la Aplicación</CardTitle>
        <CardDescription>
          Personaliza tu experiencia en la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Moneda */}
        <div className='space-y-2'>
          <Label htmlFor='currency'>Moneda Predeterminada</Label>
          <Select
            value={preferences.currency}
            onValueChange={(value) => handleChange('currency', value)}
          >
            <SelectTrigger id='currency' className='w-full'>
              <SelectValue placeholder='Seleccionar moneda' />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name} ({currency.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-xs text-muted-foreground'>
            Esta moneda se usará como predeterminada para todas las
            transacciones.
          </p>
        </div>

        {/* Idioma */}
        <div className='space-y-2'>
          <Label htmlFor='language'>Idioma</Label>
          <Select
            value={preferences.language}
            onValueChange={(value) => handleChange('language', value)}
          >
            <SelectTrigger id='language' className='w-full'>
              <SelectValue placeholder='Seleccionar idioma' />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-xs text-muted-foreground'>
            Este idioma se usará en toda la aplicación.
          </p>
        </div>

        {/* Tema */}
        <div className='space-y-2'>
          <Label>Tema</Label>
          <div className='grid grid-cols-3 gap-2'>
            <Button
              variant={preferences.theme === 'light' ? 'default' : 'outline'}
              className='flex flex-col items-center justify-center gap-1 py-6'
              onClick={() => handleChange('theme', 'light')}
            >
              <Sun className='h-5 w-5' />
              <span>Claro</span>
            </Button>
            <Button
              variant={preferences.theme === 'dark' ? 'default' : 'outline'}
              className='flex flex-col items-center justify-center gap-1 py-6'
              onClick={() => handleChange('theme', 'dark')}
            >
              <Moon className='h-5 w-5' />
              <span>Oscuro</span>
            </Button>
            <Button
              variant={preferences.theme === 'system' ? 'default' : 'outline'}
              className='flex flex-col items-center justify-center gap-1 py-6'
              onClick={() => handleChange('theme', 'system')}
            >
              <Settings className='h-5 w-5' />
              <span>Sistema</span>
            </Button>
          </div>
          <p className='text-xs text-muted-foreground'>
            Elige cómo se ve la aplicación para ti.
          </p>
        </div>

        {/* Notificaciones por correo */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div>
              <Label htmlFor='notifications'>Notificaciones por Correo</Label>
              <p className='text-xs text-muted-foreground'>
                Recibe notificaciones sobre actividad y actualizaciones.
              </p>
            </div>
            <Switch
              id='notifications'
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) =>
                handleChange('emailNotifications', checked)
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {success && (
          <p className='text-sm text-green-600'>¡Preferencias guardadas!</p>
        )}
        <div className='ml-auto'>
          <Button onClick={handleSave}>
            <Save className='mr-2 h-4 w-4' />
            Guardar Preferencias
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
