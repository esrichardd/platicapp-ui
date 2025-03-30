export function formatDate(date: Date): string {
  if (!date) return ''

  return new Intl.DateTimeFormat('default', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateLong(date: Date): string {
  if (!date) return ''

  return new Intl.DateTimeFormat('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
