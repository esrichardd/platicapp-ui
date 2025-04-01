import { AppSidebar } from '@/components/common/organisms'
import { SidebarInset, SidebarProvider } from '@/components/common/ui/sidebar'

export function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className='flex flex-1 flex-col'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
