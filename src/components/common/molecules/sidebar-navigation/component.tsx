'use client'

import { usePathname } from 'next/navigation'
import { Link } from '@/lib/intl/routing'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/common/ui/sidebar'
import { SidebarNavigationProps } from './types'

export function SidebarNavigation({
  navigation,
  onLogout,
}: SidebarNavigationProps) {
  const pathname = usePathname()

  const isActive = (url: string) => {
    return pathname === url
  }

  return (
    <>
      {navigation.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    className={item.className}
                    onClick={
                      item.label === 'Cerrar Sesión' ? onLogout : undefined
                    }
                  >
                    <Link href={item.path}>
                      {item.icon && <item.icon className='size-4' />}
                      <span>{item.label}</span>
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
