import { LucideIcon } from 'lucide-react'

type SidebarNavItem = {
  label: string
  path: string
  icon?: LucideIcon
  className?: string
}

type SidebarNavGroup = {
  label: string
  basePath: string
  items: SidebarNavItem[]
}

export type SidebarNavigationProps = {
  navigation: SidebarNavGroup[]
  onLogout?: () => Promise<void>
}
