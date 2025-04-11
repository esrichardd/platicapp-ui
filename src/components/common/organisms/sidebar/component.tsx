'use client'

import * as React from 'react'
import { GalleryVerticalEnd } from 'lucide-react'
import { logout } from '@/services/authentication'
import { UserProfileCard } from '@/components/common/atoms'
import { SidebarNavigation } from '@/components/common/molecules'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/common/ui/sidebar'
import { NAVIGATION_ITEMS, USER_MOCK } from './constants'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handleLogout = async () => {
    await logout()
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <UserProfileCard user={USER_MOCK} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation
          navigation={NAVIGATION_ITEMS}
          onLogout={handleLogout}
        />
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
