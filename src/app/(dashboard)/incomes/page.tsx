'use client'

import { useState } from 'react'
import {
  ArrowRightLeft,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Copy,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import { Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Funciones nativas para formatear fechas
function formatDate(date: Date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function formatDateLong(date: Date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

// Sample data for income entries
const incomeData = [
  {
    id: 1,
    description: 'Salario',
    category: 'Empleo',
    amount: 3500.0,
    date: '2023-06-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 2,
    description: 'Trabajo freelance',
    category: 'Autónomo',
    amount: 850.0,
    date: '2023-06-05',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 3,
    description: 'Pago de dividendos',
    category: 'Inversión',
    amount: 125.5,
    date: '2023-06-15',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 4,
    description: 'Rental Income',
    category: 'Inmobiliario',
    amount: 1200.0,
    date: '2023-06-01',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 5,
    description: 'Side Project',
    category: 'Autónomo',
    amount: 450.0,
    date: '2023-06-20',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 6,
    description: 'Tax Refund',
    category: 'Gobierno',
    amount: 750.0,
    date: '2023-06-18',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 7,
    description: 'Interest',
    category: 'Inversión',
    amount: 35.25,
    date: '2023-06-30',
    account: 'Ahorros',
    status: 'Pendiente',
  },
  {
    id: 8,
    description: 'Gift',
    category: 'Personal',
    amount: 200.0,
    date: '2023-06-25',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 9,
    description: 'Bonus',
    category: 'Empleo',
    amount: 1000.0,
    date: '2023-07-05',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 10,
    description: 'Stock Dividend',
    category: 'Inversión',
    amount: 320.75,
    date: '2023-07-10',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 11,
    description: 'Consulting Fee',
    category: 'Autónomo',
    amount: 1500.0,
    date: '2023-07-15',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 12,
    description: 'Rental Property 2',
    category: 'Inmobiliario',
    amount: 950.0,
    date: '2023-07-01',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 13,
    description: 'Tax Return',
    category: 'Gobierno',
    amount: 1250.0,
    date: '2023-07-20',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 14,
    description: 'Online Course Sales',
    category: 'Autónomo',
    amount: 750.0,
    date: '2023-07-25',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 15,
    description: 'Savings Interest',
    category: 'Inversión',
    amount: 45.5,
    date: '2023-07-30',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 16,
    description: 'Royalty Payment',
    category: 'Autónomo',
    amount: 325.0,
    date: '2023-08-05',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 17,
    description: 'Part-time Job',
    category: 'Empleo',
    amount: 600.0,
    date: '2023-08-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 18,
    description: 'Affiliate Commission',
    category: 'Autónomo',
    amount: 250.0,
    date: '2023-08-15',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 19,
    description: 'Rental Deposit Return',
    category: 'Inmobiliario',
    amount: 1000.0,
    date: '2023-08-20',
    account: 'Ahorros',
    status: 'Completado',
  },
  {
    id: 20,
    description: 'Cryptocurrency Gain',
    category: 'Inversión',
    amount: 1750.0,
    date: '2023-08-25',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 21,
    description: 'Garage Sale',
    category: 'Personal',
    amount: 350.0,
    date: '2023-08-30',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 22,
    description: 'Tutoring',
    category: 'Autónomo',
    amount: 400.0,
    date: '2023-09-05',
    account: 'Cuenta principal',
    status: 'Pendiente',
  },
  {
    id: 23,
    description: 'Quarterly Bonus',
    category: 'Empleo',
    amount: 2000.0,
    date: '2023-09-10',
    account: 'Cuenta principal',
    status: 'Completado',
  },
  {
    id: 24,
    description: 'Dividend Payout',
    category: 'Inversión',
    amount: 175.25,
    date: '2023-09-15',
    account: 'Cuenta de inversión',
    status: 'Completado',
  },
  {
    id: 25,
    description: 'Rental Income Property 3',
    category: 'Inmobiliario',
    amount: 1100.0,
    date: '2023-09-20',
    account: 'Ahorros',
    status: 'Completado',
  },
]

// Sample data for categories
const categories = [
  'Todas las categorías',
  'Empleo',
  'Autónomo',
  'Inversión',
  'Inmobiliario',
  'Gobierno',
  'Personal',
]

// Sample data for accounts
const accounts = [
  'Todas las cuentas',
  'Cuenta principal',
  'Ahorros',
  'Cuenta de inversión',
]

// Sample data for statuses
const statuses = ['Todos los estados', 'Completado', 'Pendiente']

// Opciones para el número de entradas por página
const entriesPerPageOptions = [5, 10, 25, 50]

export default function IncomesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    'Todas las categorías',
  )
  const [selectedAccount, setSelectedAccount] = useState('Todas las cuentas')
  const [selectedStatus, setSelectedStatus] = useState('Todos los estados')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false)

  // Estados para la paginación
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Agregar un estado para rastrear los elementos seleccionados
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // Filter the income data based on search term and filters
  const filteredIncome = incomeData.filter((income) => {
    const matchesSearch =
      income.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      income.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === 'Todas las categorías' ||
      income.category === selectedCategory
    const matchesAccount =
      selectedAccount === 'Todas las cuentas' ||
      income.account === selectedAccount
    const matchesStatus =
      selectedStatus === 'Todos los estados' || income.status === selectedStatus

    // Date filtering
    const incomeDate = new Date(income.date)
    const matchesDateFrom = !dateFrom || incomeDate >= dateFrom
    const matchesDateTo = !dateTo || incomeDate <= dateTo

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAccount &&
      matchesStatus &&
      matchesDateFrom &&
      matchesDateTo
    )
  })

  // Calcular el total de páginas
  const totalPages = Math.ceil(filteredIncome.length / entriesPerPage)

  // Asegurarse de que la página actual es válida cuando cambian los filtros o el número de entradas por página
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1)
  }

  // Obtener solo las entradas para la página actual
  const paginatedIncome = filteredIncome.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  )

  // Función para cambiar de página
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Modificar la función para manejar la selección de elementos
  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    )
  }

  // Función para seleccionar/deseleccionar todos los elementos de la página actual
  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedIncome.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(paginatedIncome.map((item) => item.id))
    }
  }

  return (
    <main className='flex-1 overflow-auto p-6'>
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Gestión de Ingresos
          </h2>
          <div className='ml-auto flex flex-col gap-2 sm:flex-row sm:items-center'>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className='mr-2 h-4 w-4' />
                  Agregar Ingreso
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Ingreso</DialogTitle>
                  <DialogDescription>
                    Ingresa los detalles de tu nuevo ingreso. Haz clic en
                    guardar cuando hayas terminado.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='description' className='text-right'>
                      Descripción
                    </Label>
                    <Input
                      id='description'
                      placeholder='Salary, Freelance, etc.'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='amount' className='text-right'>
                      Cantidad
                    </Label>
                    <Input
                      id='amount'
                      type='number'
                      placeholder='0.00'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='category' className='text-right'>
                      Categoría
                    </Label>
                    <Select>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((cat) => cat !== 'Todas las categorías')
                          .map((category) => (
                            <SelectItem
                              key={category}
                              value={category.toLowerCase()}
                            >
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='account' className='text-right'>
                      Cuenta
                    </Label>
                    <Select>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select account' />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts
                          .filter((acc) => acc !== 'Todas las cuentas')
                          .map((account) => (
                            <SelectItem
                              key={account}
                              value={account.toLowerCase()}
                            >
                              {account}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='date' className='text-right'>
                      Fecha
                    </Label>
                    <Input id='date' type='date' className='col-span-3' />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type='submit'
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Guardar Ingreso
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Exportar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className='pb-3'>
            <div className='flex flex-col gap-4 md:flex-row md:items-center'>
              <div className='relative w-full md:w-80'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Buscar ingresos...'
                  className='w-full pl-8'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='flex flex-1 items-center gap-2 overflow-auto'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-8 gap-1 border-dashed'
                    >
                      <Filter className='h-3.5 w-3.5' />
                      <span>Filtros</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[220px] p-4' align='start'>
                    <div className='grid gap-4'>
                      <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>Categorías</h4>
                        <div className='grid gap-2'>
                          {categories.map((category) => (
                            <div
                              key={category}
                              className='flex items-center gap-2'
                            >
                              <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategory === category}
                                onCheckedChange={() =>
                                  setSelectedCategory(category)
                                }
                              />
                              <label
                                htmlFor={`category-${category}`}
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>Cuentas</h4>
                        <div className='grid gap-2'>
                          {accounts.map((account) => (
                            <div
                              key={account}
                              className='flex items-center gap-2'
                            >
                              <Checkbox
                                id={`account-${account}`}
                                checked={selectedAccount === account}
                                onCheckedChange={() =>
                                  setSelectedAccount(account)
                                }
                              />
                              <label
                                htmlFor={`account-${account}`}
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                {account}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>Estado</h4>
                        <div className='grid gap-2'>
                          {statuses.map((status) => (
                            <div
                              key={status}
                              className='flex items-center gap-2'
                            >
                              <Checkbox
                                id={`status-${status}`}
                                checked={selectedStatus === status}
                                onCheckedChange={() =>
                                  setSelectedStatus(status)
                                }
                              />
                              <label
                                htmlFor={`status-${status}`}
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                {status}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover
                  open={isDateFilterOpen}
                  onOpenChange={setIsDateFilterOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className={`h-8 gap-1 ${dateFrom || dateTo ? 'border-primary' : 'border-dashed'}`}
                    >
                      <CalendarIcon className='h-3.5 w-3.5' />
                      <span>
                        {dateFrom && dateTo
                          ? `${formatDate(dateFrom)} - ${formatDate(dateTo)}`
                          : dateFrom
                            ? `Desde ${formatDate(dateFrom)}`
                            : dateTo
                              ? `Hasta ${formatDate(dateTo)}`
                              : 'Rango de fechas'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <div className='p-3 border-b'>
                      <div className='space-y-1'>
                        <h4 className='font-medium text-sm'>
                          Filtrar por fecha
                        </h4>
                        <p className='text-xs text-muted-foreground'>
                          Selecciona un rango de fechas para filtrar las
                          entradas de ingresos
                        </p>
                      </div>
                    </div>
                    <div className='p-3 flex flex-col gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='date-from'>Desde</Label>
                        <div className='grid gap-2'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id='date-from'
                                variant={'outline'}
                                className={`w-full justify-start text-left font-normal ${!dateFrom && 'text-muted-foreground'}`}
                              >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {dateFrom
                                  ? formatDateLong(dateFrom)
                                  : 'Seleccionar fecha'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                              <CalendarComponent
                                mode='single'
                                selected={dateFrom}
                                onSelect={setDateFrom}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='date-to'>Hasta</Label>
                        <div className='grid gap-2'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id='date-to'
                                variant={'outline'}
                                className={`w-full justify-start text-left font-normal ${!dateTo && 'text-muted-foreground'}`}
                              >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {dateTo
                                  ? formatDateLong(dateTo)
                                  : 'Seleccionar fecha'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                              <CalendarComponent
                                mode='single'
                                selected={dateTo}
                                onSelect={setDateTo}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className='flex justify-between'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setDateFrom(undefined)
                            setDateTo(undefined)
                          }}
                          disabled={!dateFrom && !dateTo}
                        >
                          Reiniciar
                        </Button>
                        <Button
                          size='sm'
                          onClick={() => setIsDateFilterOpen(false)}
                        >
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className='h-8 w-[180px]'>
                    <SelectValue placeholder='Categoría' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedAccount}
                  onValueChange={setSelectedAccount}
                >
                  <SelectTrigger className='h-8 w-[180px]'>
                    <SelectValue placeholder='Cuenta' />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account} value={account}>
                        {account}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className='h-8 w-[180px]'>
                    <SelectValue placeholder='Estado' />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <div
            className={`flex items-center gap-2 px-4 py-2 border-b transition-all ${selectedItems.length > 0 ? 'opacity-100' : 'opacity-0 h-0 py-0 overflow-hidden border-b-0'}`}
          >
            <span className='text-sm font-medium'>
              {selectedItems.length} elementos seleccionados
            </span>
            <div className='ml-auto flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                disabled={selectedItems.length === 0}
                onClick={() => {
                  // Aquí iría la lógica para duplicar los elementos seleccionados
                  alert(`Duplicating ${selectedItems.length} items`)
                  setSelectedItems([])
                }}
              >
                <Copy className='h-4 w-4 mr-1' />
                Duplicar
              </Button>
              <Button
                variant='outline'
                size='sm'
                disabled={selectedItems.length === 0}
                onClick={() => {
                  // Aquí iría la lógica para transferir los elementos seleccionados
                  alert(`Transferring ${selectedItems.length} items`)
                  setSelectedItems([])
                }}
              >
                <ArrowRightLeft className='h-4 w-4 mr-1' />
                Transferir
              </Button>
              <Button
                variant='destructive'
                size='sm'
                disabled={selectedItems.length === 0}
                onClick={() => {
                  // Aquí iría la lógica para eliminar los elementos seleccionados
                  alert(`Deleting ${selectedItems.length} items`)
                  setSelectedItems([])
                }}
              >
                <Trash2 className='h-4 w-4 mr-1' />
                Delete
              </Button>
            </div>
          </div>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[50px]'>
                    <Checkbox
                      checked={
                        paginatedIncome.length > 0 &&
                        selectedItems.length === paginatedIncome.length
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className='text-right'>Monto</TableHead>
                  <TableHead className='w-[80px]'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedIncome.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className='h-24 text-center'>
                      No se encontraron entradas de ingresos.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedIncome.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(income.id)}
                          onCheckedChange={() => toggleSelectItem(income.id)}
                        />
                      </TableCell>
                      <TableCell className='font-medium'>
                        {income.description}
                      </TableCell>
                      <TableCell>{income.category}</TableCell>
                      <TableCell>{income.account}</TableCell>
                      <TableCell>
                        {new Date(income.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            income.status === 'Completado'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {income.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right font-medium text-green-600'>
                        ${income.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Open menu</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-red-600'>
                              <Trash2 className='mr-2 h-4 w-4' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-muted-foreground'>Showing</span>
                <strong>
                  {paginatedIncome.length > 0
                    ? (currentPage - 1) * entriesPerPage + 1
                    : 0}
                </strong>
                <span className='text-sm text-muted-foreground'>to</span>
                <strong>
                  {Math.min(
                    currentPage * entriesPerPage,
                    filteredIncome.length,
                  )}
                </strong>
                <span className='text-sm text-muted-foreground'>of</span>
                <strong>{filteredIncome.length}</strong>
                <span className='text-sm text-muted-foreground'>entries</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-muted-foreground'>Show</span>
                <Select
                  value={entriesPerPage.toString()}
                  onValueChange={(value) => {
                    setEntriesPerPage(Number.parseInt(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className='h-8 w-[80px]'>
                    <SelectValue placeholder='10' />
                  </SelectTrigger>
                  <SelectContent>
                    {entriesPerPageOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className='text-sm text-muted-foreground'>per page</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className='h-4 w-4 mr-1' />
                Previous
              </Button>
              <div className='flex items-center gap-1'>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageToShow
                  if (totalPages <= 5) {
                    pageToShow = i + 1
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i
                  } else {
                    pageToShow = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageToShow}
                      variant={
                        currentPage === pageToShow ? 'default' : 'outline'
                      }
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => changePage(pageToShow)}
                    >
                      {pageToShow}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
                <ChevronRight className='h-4 w-4 ml-1' />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
