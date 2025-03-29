import { SidebarTrigger } from '../ui/sidebar'

export function DashboardPageLayout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <>
      <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6'>
        <SidebarTrigger />
        <h1 className='text-xl font-semibold'>{title}</h1>
      </header>
      {children}
    </>
  )
}
