import React from 'react'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import { ItemCardProps } from './types'

export function ItemCard({
  name,
  icon,
  color,
  description,
  subtitle,
  onEdit,
  onDelete,
  extraFooterAction,
}: ItemCardProps) {
  return (
    <Card className='overflow-hidden'>
      <div className='h-2' style={{ backgroundColor: color }} />
      <CardHeader className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div
              className='flex h-8 w-8 items-center justify-center rounded-full'
              style={{ backgroundColor: color }}
            >
              <div className='text-white'>{icon}</div>
            </div>
            <div>
              <CardTitle className='text-base'>{name}</CardTitle>
              {subtitle && (
                <p className='text-xs text-muted-foreground'>{subtitle}</p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Abrir menú</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className='mr-2 h-4 w-4' />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive' onClick={onDelete}>
                <Trash2 className='mr-2 h-4 w-4' />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <p className='text-sm text-muted-foreground'>
          {description || 'Sin descripción'}
        </p>
      </CardContent>
      {extraFooterAction && (
        <CardFooter className='p-4 pt-0 flex justify-end'>
          {extraFooterAction}
        </CardFooter>
      )}
    </Card>
  )
}
