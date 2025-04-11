'use server'

import { handleSupabaseError } from '@/lib/helpers/handle-supabase-error'
import { Category, CategoryInput } from '@/lib/sdk-types'
import { createClient } from '@/lib/supabase/server'

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*')

  if (error) handleSupabaseError('getAllCategories', error)

  return data
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) handleSupabaseError('getCategoryById', error)

  return data
}

export async function createCategory(
  payload: CategoryInput,
): Promise<Category> {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user)
    throw handleSupabaseError('createCategory:getUser', userError)

  const request = {
    ...payload,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from('categories')
    .insert(request)
    .select()
    .single()

  if (error) handleSupabaseError('createCategory:insert', error)

  return data
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryInput>,
): Promise<Category> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) handleSupabaseError('updateCategory', error)

  return data
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) handleSupabaseError('deleteCategory', error)

  return true
}
