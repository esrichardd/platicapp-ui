import { useEffect, useMemo, useState } from 'react'
import {
  FilterState,
  PaginationState,
  Transaction,
  UseTransactionFiltersResult,
} from '@/lib/sdk-types'

export function useTransactionFilters(
  data: Transaction[],
): UseTransactionFiltersResult {
  const [filters, setFiltersState] = useState<FilterState>({
    searchTerm: '',
    selectedCategory: 'Todas las categorías',
    selectedAccount: 'Todas las cuentas',
    selectedStatus: 'Todos los estados',
    dateFrom: undefined,
    dateTo: undefined,
  })

  const [pagination, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    entriesPerPage: 10,
  })

  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
    setPaginationState((prev) => ({ ...prev, currentPage: 1 }))
  }

  const setPagination = (newPagination: Partial<PaginationState>) => {
    setPaginationState((prev) => ({ ...prev, ...newPagination }))
  }

  const filteredData = useMemo(() => {
    return data.filter((income) => {
      const matchesSearch =
        income.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        income.category.toLowerCase().includes(filters.searchTerm.toLowerCase())

      const matchesCategory =
        filters.selectedCategory === 'Todas las categorías' ||
        income.category === filters.selectedCategory

      const matchesAccount =
        filters.selectedAccount === 'Todas las cuentas' ||
        income.account === filters.selectedAccount

      const matchesStatus =
        filters.selectedStatus === 'Todos los estados' ||
        income.status === filters.selectedStatus

      const incomeDate = new Date(income.date)
      const matchesDateFrom =
        !filters.dateFrom || incomeDate >= filters.dateFrom
      const matchesDateTo = !filters.dateTo || incomeDate <= filters.dateTo

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAccount &&
        matchesStatus &&
        matchesDateFrom &&
        matchesDateTo
      )
    })
  }, [data, filters])

  const totalPages = Math.ceil(filteredData.length / pagination.entriesPerPage)

  const paginatedData = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.entriesPerPage
    const end = start + pagination.entriesPerPage
    return filteredData.slice(start, end)
  }, [filteredData, pagination])

  useEffect(() => {
    if (pagination.currentPage > totalPages && totalPages > 0) {
      setPaginationState((prev) => ({ ...prev, currentPage: 1 }))
    }
  }, [totalPages, pagination.currentPage])

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(paginatedData.map((item) => item.id))
    }
  }

  const clearSelection = () => setSelectedItems([])

  return {
    filteredData,
    paginatedData,
    filters,
    setFilters,
    pagination: { ...pagination, totalPages },
    setPagination,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    clearSelection,
  }
}
