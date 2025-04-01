'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ENTRIES_PER_PAGE_OPTIONS } from '@/lib/helpers/constants'
import { Button } from '@/components/common/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select'
import { PaginationControlsProps } from './type'

export function PaginationControls({
  pagination,
  onChangePage,
  onChangeEntriesPerPage,
}: PaginationControlsProps) {
  const { currentPage, totalPages, entriesPerPage, totalItems } = pagination

  const start = totalItems === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1
  const end = Math.min(currentPage * entriesPerPage, totalItems)

  const generatePageNumbers = () => {
    const maxButtons = 5

    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ]
  }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
        <span>Mostrando</span>
        <strong>{start}</strong>
        <span>a</span>
        <strong>{end}</strong>
        <span>de</span>
        <strong>{totalItems}</strong>
        <span>registros</span>

        <span className='ml-4'>Mostrar</span>
        <Select
          value={entriesPerPage.toString()}
          onValueChange={(value) => onChangeEntriesPerPage(parseInt(value))}
        >
          <SelectTrigger className='h-8 w-[80px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ENTRIES_PER_PAGE_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt.toString()}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>por página</span>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          disabled={currentPage === 1}
          onClick={() => onChangePage(currentPage - 1)}
        >
          <ChevronLeft className='w-4 h-4 mr-1' />
          <span className='hidden sm:inline'>Anterior</span>
        </Button>

        {generatePageNumbers().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            size='icon'
            className='h-8 w-8'
            onClick={() => onChangePage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant='outline'
          size='sm'
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <span className='hidden sm:inline'>Siguiente</span>
          <ChevronRight className='w-4 h-4 ml-1' />
        </Button>
      </div>
    </div>
  )
}
