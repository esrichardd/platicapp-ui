import { CreditCard, DollarSign, PieChart, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FinancialSummary() {
  const summary = [
    {
      title: 'Balance Total',
      value: '$12,546.00',
      change: '+2.5% del mes pasado',
      icon: <Wallet className='h-4 w-4 text-muted-foreground' />,
    },
    {
      title: 'Ingresos',
      value: '$4,350.00',
      change: '+5.2% del mes pasado',
      icon: <DollarSign className='h-4 w-4 text-muted-foreground' />,
    },
    {
      title: 'Gastos',
      value: '$2,890.00',
      change: '-3.1% del mes pasado',
      icon: <CreditCard className='h-4 w-4 text-muted-foreground' />,
    },
    {
      title: 'Ahorros',
      value: '$1,460.00',
      change: '+8.2% del mes pasado',
      icon: <PieChart className='h-4 w-4 text-muted-foreground' />,
    },
  ]

  return (
    <div className='grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
      {summary.map((item) => (
        <Card key={item.title}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className='text-xl md:text-2xl font-bold'>{item.value}</div>
            <p className='text-xs text-muted-foreground'>{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
