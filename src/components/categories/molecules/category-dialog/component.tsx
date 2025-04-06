'use client'

import React, { useEffect, useState } from 'react'
import {
  Calendar,
  Check,
  ChevronDown,
  DollarSign,
  Grid,
  LayoutDashboard,
  PieChart,
  Settings,
  User,
  Wallet,
} from 'lucide-react'
import { getIconByName } from '@/lib/helpers/get-icon-by-name'
import { Category } from '@/lib/sdk-types'
import { Button } from '@/components/common/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/ui/dialog'
import { Input } from '@/components/common/ui/input'
import { Label } from '@/components/common/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/ui/popover'
import { CategoryDialogProps } from './types'

const availableIcons = [
  { name: 'Compras', icon: <Grid className='h-4 w-4' /> },
  { name: 'Comida', icon: <Calendar className='h-4 w-4' /> },
  { name: 'Transporte', icon: <Wallet className='h-4 w-4' /> },
  { name: 'Entretenimiento', icon: <PieChart className='h-4 w-4' /> },
  { name: 'Salud', icon: <User className='h-4 w-4' /> },
  { name: 'Educación', icon: <Settings className='h-4 w-4' /> },
  { name: 'Hogar', icon: <LayoutDashboard className='h-4 w-4' /> },
  { name: 'Otro', icon: <DollarSign className='h-4 w-4' /> },
]

const availableColors = [
  { name: 'Red', value: '#ef4444', class: 'bg-red-500' },
  { name: 'Orange', value: '#f97316', class: 'bg-orange-500' },
  { name: 'Amber', value: '#f59e0b', class: 'bg-amber-500' },
  { name: 'Yellow', value: '#eab308', class: 'bg-yellow-500' },
  { name: 'Lime', value: '#84cc16', class: 'bg-lime-500' },
  { name: 'Green', value: '#22c55e', class: 'bg-green-500' },
  { name: 'Emerald', value: '#10b981', class: 'bg-emerald-500' },
  { name: 'Teal', value: '#14b8a6', class: 'bg-teal-500' },
  { name: 'Cyan', value: '#06b6d4', class: 'bg-cyan-500' },
  { name: 'Sky', value: '#0ea5e9', class: 'bg-sky-500' },
  { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
  { name: 'Indigo', value: '#6366f1', class: 'bg-indigo-500' },
  { name: 'Violet', value: '#8b5cf6', class: 'bg-violet-500' },
  { name: 'Purple', value: '#a855f7', class: 'bg-purple-500' },
  { name: 'Fuchsia', value: '#d946ef', class: 'bg-fuchsia-500' },
  { name: 'Pink', value: '#ec4899', class: 'bg-pink-500' },
  { name: 'Rose', value: '#f43f5e', class: 'bg-rose-500' },
  { name: 'Slate', value: '#64748b', class: 'bg-slate-500' },
]

export function CategoryDialog({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: CategoryDialogProps) {
  const [formData, setFormData] = useState<Category>({
    id: 0,
    name: '',
    icon: '',
    color: '',
    description: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.icon || !formData.color) {
      alert('Por favor completa los campos requeridos.')
      return
    }
    onSubmit(formData)
    setFormData({ id: 0, name: '', icon: '', color: '', description: '' })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Actualiza los detalles de la categoría.'
              : 'Crea una nueva categoría para organizar tus ingresos y gastos.'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='category-name' className='text-right'>
              Nombre
            </Label>
            <Input
              id='category-name'
              className='col-span-3'
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='category-icon' className='text-right'>
              Icono
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='category-icon'
                  variant='outline'
                  className='col-span-3 justify-start'
                >
                  {formData.icon ? (
                    <>
                      <div className='mr-2'>{getIconByName(formData.icon)}</div>
                      {formData.icon}
                    </>
                  ) : (
                    'Seleccionar un icono'
                  )}
                  <ChevronDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <div className='max-h-[300px] overflow-y-auto'>
                  <div className='p-1'>
                    <div className='overflow-hidden'>
                      {availableIcons.map((icon) => (
                        <div
                          key={icon.name}
                          onClick={() => handleChange('icon', icon.name)}
                          className='flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-muted'
                        >
                          <div>{icon.icon}</div>
                          <span>{icon.name}</span>
                          {formData.icon === icon.name && (
                            <Check className='ml-auto h-4 w-4' />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='category-color' className='text-right'>
              Color
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='category-color'
                  variant='outline'
                  className='col-span-3 justify-start'
                >
                  {formData.color ? (
                    <>
                      <div
                        className={`mr-2 h-4 w-4 rounded-full ${availableColors.find((c) => c.value === formData.color)?.class || ''}`}
                      />
                      {availableColors.find((c) => c.value === formData.color)
                        ?.name || 'Personalizado'}
                    </>
                  ) : (
                    'Seleccionar un color'
                  )}
                  <ChevronDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-2'>
                <div className='grid grid-cols-4 gap-1'>
                  {availableColors.map((color) => (
                    <div
                      key={color.value}
                      className={`h-8 w-8 rounded-full ${color.class} cursor-pointer flex items-center justify-center`}
                      onClick={() => handleChange('color', color.value)}
                      title={color.name}
                    >
                      {formData.color === color.value && (
                        <Check className='h-4 w-4 text-white' />
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='category-description' className='text-right'>
              Descripción
            </Label>
            <Input
              id='category-description'
              placeholder='Descripción opcional'
              className='col-span-3'
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSubmit}>
            {mode === 'edit' ? 'Guardar Cambios' : 'Agregar Categoría'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
