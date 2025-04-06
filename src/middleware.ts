import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { CookieOptions } from '@supabase/ssr'
import { updateSession } from '@/lib/supabase/middleware'
import { routing } from './lib/intl/routing'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const localeMatch = pathname.match(/^\/(es|en)(\/|$)/)
  const hasLocale = !!localeMatch
  const locale = hasLocale ? localeMatch[1] : getDefaultLocale(request)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
        },
      },
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isLoginPage = pathname === `/${locale}/login` || pathname === '/login'
  const isRegisterPage =
    pathname === `/${locale}/register` || pathname === '/register'
  const isAuthPage = isLoginPage || isRegisterPage

  // CASO 1: Sin locale (/, /login, /dashboard, etc.)
  if (!hasLocale) {
    const destination = session ? 'dashboard' : 'login'
    return NextResponse.redirect(
      new URL(`/${locale}/${destination}`, request.url),
    )
  }

  // CASO 2: /es o /en solito
  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    const destination = session ? 'dashboard' : 'login'
    return NextResponse.redirect(
      new URL(`/${locale}/${destination}`, request.url),
    )
  }

  // CASO 3: Ruta protegida sin sesión
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  // CASO 4: Ruta pública con sesión activa
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  // CASO 5: Todo OK, actualizamos sesión y continuamos
  return await updateSession(request)
}

function getDefaultLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language')
  const accepted = acceptLang?.split(',') || []

  for (const lang of accepted) {
    const code = lang.trim().split('-')[0]
    if (routing.locales.includes(code as 'es' | 'en')) {
      return code
    }
  }

  return routing.defaultLocale
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
