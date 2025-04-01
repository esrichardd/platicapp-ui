import { Plus } from 'lucide-react'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Crear nuevas transacciones</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Button className='w-full'>
          <Plus className='mr-2 h-4 w-4' />
          Agregar Ingresos
        </Button>
        <Button variant='outline' className='w-full'>
          <Plus className='mr-2 h-4 w-4' />
          Agregar Gastos
        </Button>
        <Button variant='secondary' className='w-full'>
          <Plus className='mr-2 h-4 w-4' />
          Transferir Fondos
        </Button>
      </CardContent>
    </Card>
  )
}
