'use client'

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
  data: {
    navMain: NavGroup[]
  }
  onLogout?: () => Promise<void>
}

export function NavMain({ data, onLogout }: NavMainProps) {
  return (
    <>
      {data.navMain.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={item.className}
                    onClick={
                      item.title === 'Cerrar Sesión' ? onLogout : undefined
                    }
                  >
                    <a href={item.url}>
                      {item.icon && <item.icon className='size-4' />}
                      <span>{item.title}</span>
                    </a>
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
