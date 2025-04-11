'use server'

import { handleSupabaseError } from '@/lib/helpers/handle-supabase-error'
import { Account, AccountInput } from '@/lib/sdk-types/account'
import { createClient } from '@/lib/supabase/server'

export async function getAllBankAccounts(): Promise<Account[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('bank_accounts').select('*')

  if (error) handleSupabaseError('getAllBankAccounts', error)

  return data
}

export async function getBankAccountById(id: string): Promise<Account | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) handleSupabaseError('getBankAccountById', error)

  return data
}

export async function createBankAccount(
  payload: AccountInput,
): Promise<Account> {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user)
    throw handleSupabaseError('createBankAccount:getUser', userError)

  const request = {
    ...payload,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from('bank_accounts')
    .insert(request)
    .select()
    .single()

  if (error) handleSupabaseError('createBankAccount:insert', error)

  return data
}

export async function updateBankAccount(
  id: string,
  payload: Partial<AccountInput>,
): Promise<Account> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bank_accounts')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) handleSupabaseError('updateBankAccount', error)

  return data
}

export async function deleteBankAccount(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('bank_accounts').delete().eq('id', id)

  if (error) handleSupabaseError('deleteBankAccount', error)

  return true
}
