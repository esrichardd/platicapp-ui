'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { formatDate, formatDateLong } from '@/lib/helpers/formatters'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DateRangeFilterProps } from './type'

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onChange,
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false)
  const [dateFromOpen, setDateFromOpen] = useState(false)
  const [dateToOpen, setDateToOpen] = useState(false)

  const reset = () => onChange({ dateFrom: undefined, dateTo: undefined })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={`h-8 gap-1 ${dateFrom || dateTo ? 'border-primary' : 'border-dashed'}`}
        >
          <CalendarIcon className='h-3.5 w-3.5' />
          <span className='hidden sm:inline'>
            {dateFrom && dateTo
              ? `${formatDate(dateFrom)} - ${formatDate(dateTo)}`
              : dateFrom
                ? `Desde ${formatDate(dateFrom)}`
                : dateTo
                  ? `Hasta ${formatDate(dateTo)}`
                  : 'Rango de fechas'}
          </span>
          <span className='sm:hidden'>Fechas</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-auto p-0' align='start'>
        <div className='p-3 border-b'>
          <h4 className='font-medium text-sm'>Filtrar por fecha</h4>
          <p className='text-xs text-muted-foreground'>
            Selecciona un rango de fechas para filtrar
          </p>
        </div>

        <div className='p-3 flex flex-col gap-4'>
          <div className='space-y-2'>
            <Label>Desde</Label>
            <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`w-full justify-start text-left font-normal ${!dateFrom && 'text-muted-foreground'}`}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {dateFrom ? formatDateLong(dateFrom) : 'Seleccionar fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={dateFrom}
                  onSelect={(date) => {
                    onChange({ dateFrom: date ?? undefined, dateTo })
                    setDateFromOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className='space-y-2'>
            <Label>Hasta</Label>
            <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`w-full justify-start text-left font-normal ${!dateTo && 'text-muted-foreground'}`}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {dateTo ? formatDateLong(dateTo) : 'Seleccionar fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <CalendarComponent
                  mode='single'
                  selected={dateTo}
                  onSelect={(date) => {
                    onChange({ dateFrom, dateTo: date ?? undefined })
                    setDateToOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className='flex justify-between'>
            <Button
              variant='outline'
              size='sm'
              onClick={reset}
              disabled={!dateFrom && !dateTo}
            >
              Reiniciar
            </Button>
            <Button size='sm' onClick={() => setOpen(false)}>
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
