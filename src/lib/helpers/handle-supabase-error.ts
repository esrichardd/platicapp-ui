import { AuthError, PostgrestError } from '@supabase/supabase-js'

export function handleSupabaseError(
  context: string,
  error: PostgrestError | AuthError | null,
): asserts error is null {
  if (error) {
    console.error(`❌ [${context}]`, error)
    throw error
  }
}
