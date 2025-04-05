import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Save } from 'lucide-react'
import { formatDate } from '@/lib/helpers/formatters'
import { Button } from '@/components/common/ui/button'
import { Calendar as CalendarComponent } from '@/components/common/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'

export function PersonalInfoCard() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date('1990-01-15'),
    gender: 'male',
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const handleSave = () => {
    console.log('Guardando info personal:', personalInfo)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Actualiza tus datos personales aquí.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>Nombre</Label>
            <Input
              id='firstName'
              value={personalInfo.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Apellido</Label>
            <Input
              id='lastName'
              value={personalInfo.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='birthDate'>Fecha de Nacimiento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {format(personalInfo.birthDate, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={personalInfo.birthDate}
                  onSelect={(date) =>
                    date && handleChange('birthDate', formatDate(date))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='gender'>Género</Label>
            <Select
              value={personalInfo.gender}
              onValueChange={(value) => handleChange('gender', value)}
            >
              <SelectTrigger id='gender'>
                <SelectValue placeholder='Seleccionar género' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='male'>Masculino</SelectItem>
                <SelectItem value='female'>Femenino</SelectItem>
                <SelectItem value='other'>Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {success && <p className='text-sm text-green-600'>¡Actualizado!</p>}
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
