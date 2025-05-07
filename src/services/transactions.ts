'use server'

import { handleSupabaseError } from '@/lib/helpers/handle-supabase-error'
import type {
  TransactionInput,
  TransactionWithRelations,
} from '@/lib/sdk-types'
import { createClient } from '@/lib/supabase/server'

const SELECT_WITH_RELATIONS = `
  *,
  category:categories(*),
  subcategory:subcategories(*),
  bank_account:bank_accounts(*)
`

export async function getAllTransactions(): Promise<
  TransactionWithRelations[]
> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('transactions')
    .select(SELECT_WITH_RELATIONS)

  if (error) handleSupabaseError('getAllTransactions', error)
  return data
}

export async function getTransactionById(
  id: string,
): Promise<TransactionWithRelations | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('transactions')
    .select(SELECT_WITH_RELATIONS)
    .eq('id', id)
    .single()

  if (error) handleSupabaseError('getTransactionById', error)
  return data
}

export async function createTransaction(
  payload: TransactionInput,
): Promise<TransactionWithRelations> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user)
    throw handleSupabaseError('createTransaction:getUser', userError)

  const { data, error } = await supabase
    .from('transactions')
    .insert({ ...payload, user_id: user.id })
    .select(SELECT_WITH_RELATIONS)
    .single()

  if (error) handleSupabaseError('createTransaction:insert', error)
  return data
}

export async function updateTransaction(
  id: string,
  payload: Partial<TransactionInput>,
): Promise<TransactionWithRelations> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('transactions')
    .update(payload)
    .eq('id', id)
    .select(SELECT_WITH_RELATIONS)
    .single()

  if (error) handleSupabaseError('updateTransaction', error)
  return data
}

export async function deleteTransaction(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.from('transactions').delete().eq('id', id)
  if (error) handleSupabaseError('deleteTransaction', error)
  return true
}
