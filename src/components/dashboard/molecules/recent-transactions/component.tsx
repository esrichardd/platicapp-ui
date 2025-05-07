import { TransactionWithRelations } from '@/lib/sdk-types'
import { Badge } from '@/components/common/ui/badge'
import { Button } from '@/components/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'

type RecentTransactionsProps = {
  transactions: TransactionWithRelations[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Recientes</CardTitle>
        <CardDescription>Tus últimas 5 transacciones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className='flex flex-col gap-2 rounded-lg border p-4'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant={
                      transaction.type === 'INCOME' ? 'default' : 'secondary'
                    }
                  >
                    {transaction.type === 'INCOME' ? 'Ingreso' : 'Gasto'}
                  </Badge>
                  <span className='font-medium'>{transaction.description}</span>
                </div>
                <span
                  className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {transaction.amount.toFixed(2)}
                </span>
              </div>
              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <span>{transaction.bank_account.account_name}</span>
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button variant='outline' size='sm'>
          Ver Todas las Transacciones
        </Button>
      </CardFooter>
    </Card>
  )
}
