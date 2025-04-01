import {
  DollarSign,
  HelpCircle,
  Home,
  LogOut,
  Receipt,
  Settings,
  Tags,
  User,
  Wallet,
} from 'lucide-react'

export const USER_MOCK = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatars/shadcn.jpg',
}

export const NAVIGATION_ITEMS = [
  {
    label: 'Dashboard',
    basePath: '/dashboard',
    items: [
      {
        label: 'Inicio',
        path: '/dashboard',
        icon: Home,
      },
      {
        label: 'Ingresos',
        path: '/incomes',
        icon: DollarSign,
      },
      {
        label: 'Gastos',
        path: '/expenses',
        icon: Receipt,
      },
      {
        label: 'Cuentas de Banco',
        path: '/accounts',
        icon: Wallet,
      },
      {
        label: 'Categorías',
        path: '/categories',
        icon: Tags,
      },
    ],
  },
  {
    label: 'Personal',
    basePath: '#',
    items: [
      {
        label: 'Perfil',
        path: '#',
        icon: User,
      },
      {
        label: 'Configuración',
        path: '#',
        icon: Settings,
      },
      {
        label: 'Ayuda',
        path: '#',
        icon: HelpCircle,
      },
      {
        label: 'Cerrar Sesión',
        path: '#',
        icon: LogOut,
        className: 'text-destructive hover:text-destructive',
      },
    ],
  },
]
