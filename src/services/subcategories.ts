'use server'

import { handleSupabaseError } from '@/lib/helpers/handle-supabase-error'
import { Subcategory, SubcategoryInput } from '@/lib/sdk-types'
import { createClient } from '@/lib/supabase/server'

export async function getAllSubcategories(): Promise<Subcategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('subcategories').select('*')

  if (error) handleSupabaseError('getAllSubcategories', error)

  return data
}

export async function getSubcategoryById(
  id: string,
): Promise<Subcategory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) handleSupabaseError('getSubcategoryById', error)

  return data
}

export async function createSubcategory(
  payload: SubcategoryInput,
): Promise<Subcategory> {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) throw userError || new Error('Usuario no autenticado')

  const request = {
    ...payload,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from('subcategories')
    .insert(request)
    .select()
    .single()

  if (error) handleSupabaseError('createSubcategory', error)

  return data
}

export async function updateSubcategory(
  id: string,
  payload: Partial<SubcategoryInput>,
): Promise<Subcategory> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subcategories')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) handleSupabaseError('updateSubcategory', error)

  return data
}

export async function deleteSubcategory(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('subcategories').delete().eq('id', id)

  if (error) handleSupabaseError('deleteSubcategory', error)

  return true
}
