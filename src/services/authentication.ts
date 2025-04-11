'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  console.log(error)
  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function register({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
