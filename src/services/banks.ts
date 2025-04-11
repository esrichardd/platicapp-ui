'use server'

import { handleSupabaseError } from '@/lib/helpers/handle-supabase-error'
import { Bank, BankInput } from '@/lib/sdk-types/bank'
import { createClient } from '@/lib/supabase/server'

export async function getAllBanks(): Promise<Bank[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('banks').select('*')

  if (error) handleSupabaseError('getAllBanks', error)

  return data
}

export async function getBankById(id: string): Promise<Bank | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('banks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) handleSupabaseError('getBankById', error)

  return data
}

export async function createBank(payload: BankInput): Promise<Bank> {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user)
    throw handleSupabaseError('createBank:getUser', userError)

  const request = {
    ...payload,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from('banks')
    .insert(request)
    .select()
    .single()

  if (error) handleSupabaseError('createBank:insert', error)

  return data
}

export async function updateBank(
  id: string,
  payload: Partial<BankInput>,
): Promise<Bank> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('banks')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) handleSupabaseError('updateBank', error)

  return data
}

export async function deleteBank(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('banks').delete().eq('id', id)

  if (error) handleSupabaseError('deleteBank', error)

  return true
}
