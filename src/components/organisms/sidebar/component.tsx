'use client'

import * as React from 'react'
import {
  AudioWaveform,
  Command,
  DollarSign,
  GalleryVerticalEnd,
  HelpCircle,
  Home,
  LogOut,
  Receipt,
  Settings,
  Tags,
  User,
  Wallet,
} from 'lucide-react'
import { logout } from '@/services/auth/logout'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

// This is sample data.
const data = {
  user: {
    name: 'Richard',
    email: 'richard@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      items: [
        {
          title: 'Inicio',
          url: '/dashboard',
          isActive: true,
          icon: Home,
        },
        {
          title: 'Ingresos',
          url: '/dashboard/incomes',
          isActive: false,
          icon: DollarSign,
        },
        {
          title: 'Gastos',
          url: '/dashboard/expenses',
          isActive: false,
          icon: Receipt,
        },
        {
          title: 'Cuentas de Banco',
          url: '/dashboard/accounts',
          isActive: false,
          icon: Wallet,
        },
        {
          title: 'Categorías',
          url: '/dashboard/categories',
          isActive: false,
          icon: Tags,
        },
      ],
    },
    {
      title: 'Personal',
      url: '#',
      items: [
        {
          title: 'Perfil',
          url: '#',
          isActive: false,
          icon: User,
        },
        {
          title: 'Configuración',
          url: '#',
          isActive: false,
          icon: Settings,
        },
        {
          title: 'Ayuda',
          url: '#',
          isActive: false,
          icon: HelpCircle,
        },
        {
          title: 'Cerrar Sesión',
          url: '#',
          isActive: false,
          icon: LogOut,
          className: 'text-destructive hover:text-destructive',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handleLogout = async () => {
    await logout()
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={data} onLogout={handleLogout} />
      </SidebarContent>
      <SidebarFooter>
        <div className='flex items-center justify-center gap-2 px-2'>
          <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          <span className='font-medium'>Platicapp</span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
