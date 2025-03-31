import { getIconByName } from '@/lib/helpers/get-icon-by-name'
import { ItemCard } from '../item-card/component'
import { SubcategoryCardProps } from './type'

export function SubcategoryCard({
  subcategory,
  parentCategoryName,
  onEdit,
  onDelete,
}: SubcategoryCardProps) {
  return (
    <ItemCard
      name={subcategory.name}
      icon={getIconByName(subcategory.icon)}
      color={subcategory.color}
      description={subcategory.description}
      subtitle={parentCategoryName}
      onEdit={() => onEdit(subcategory)}
      onDelete={() => onDelete(subcategory)}
    />
  )
}
