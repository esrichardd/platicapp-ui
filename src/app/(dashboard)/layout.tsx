import { PrivateLayout } from '@/components/common/layouts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>
}
