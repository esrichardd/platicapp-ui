'use client'

import { logout } from '@/services/auth/logout'
import { Button } from '@/components/ui/button'

export function DashboardTemplate() {
  const handleLogout = async () => {
    await logout()
  }

  return (
    <div>
      <div>Dashboard</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
