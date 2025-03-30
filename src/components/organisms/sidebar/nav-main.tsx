'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface MenuItem {
  title: string
  url: string
  isActive: boolean
  icon?: LucideIcon
  className?: string
}

interface NavGroup {
  title: string
  url: string
  items: MenuItem[]
}

interface NavMainProps {
  navMain: NavGroup[]
  onLogout?: () => Promise<void>
}

export function NavMain({ navMain, onLogout }: NavMainProps) {
  const pathname = usePathname()

  const isActive = (url: string) => {
    return pathname === url
  }

  return (
    <>
      {navMain.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={item.className}
                    onClick={
                      item.title === 'Cerrar Sesión' ? onLogout : undefined
                    }
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className='size-4' />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
