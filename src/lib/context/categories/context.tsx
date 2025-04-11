'use client'

import { createContext, useContext } from 'react'
import { useCategoriesManager } from '@/lib/hooks/categories'

const CategoriesManagerContext = createContext<ReturnType<
  typeof useCategoriesManager
> | null>(null)

export const CategoriesManagerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const value = useCategoriesManager()
  return (
    <CategoriesManagerContext.Provider value={value}>
      {children}
    </CategoriesManagerContext.Provider>
  )
}

export const useCategoriesContext = () => {
  const ctx = useContext(CategoriesManagerContext)
  if (!ctx)
    throw new Error(
      'useCategoriesContext debe usarse dentro de CategoriesManagerProvider',
    )
  return ctx
}
