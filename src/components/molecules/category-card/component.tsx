import React from 'react'
import { ChevronRight } from 'lucide-react'
import { getIconByName } from '@/lib/helpers/get-icon-by-name'
import { Button } from '@/components/ui/button'
import { ItemCard } from '../item-card/component'
import { CategoryCardProps } from './type'

export function CategoryCard({
  category,
  subcategoriesCount,
  onEdit,
  onDelete,
  onViewSubcategories,
}: CategoryCardProps) {
  return (
    <ItemCard
      name={category.name}
      icon={getIconByName(category.icon)}
      color={category.color}
      description={category.description}
      subtitle={`${subcategoriesCount} subcategorías`}
      onEdit={() => onEdit(category)}
      onDelete={() => onDelete(category)}
      extraFooterAction={
        <Button
          variant='ghost'
          size='sm'
          className='text-xs'
          onClick={() => onViewSubcategories(category.id)}
        >
          Ver Subcategorías <ChevronRight className='ml-1 h-3 w-3' />
        </Button>
      }
    />
  )
}
