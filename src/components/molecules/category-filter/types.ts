export type CategoryFilterProps = {
  value: string
  onChange: (value: string) => void
  categories?: string[] // permite pasar una lista personalizada
}
