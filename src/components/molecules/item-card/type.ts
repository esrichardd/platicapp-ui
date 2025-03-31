export type ItemCardProps = {
  name: string
  icon: React.ReactNode
  color: string
  description?: string
  subtitle?: string
  onEdit: () => void
  onDelete: () => void
  extraFooterAction?: React.ReactNode
}
