import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  const dashboardMatch = request.nextUrl.pathname.match(/^\/dashboard\/(parent|student|instructor|admin)(?:\/|$)/)
  const requiredRole = dashboardMatch?.[1]
  const userRole = user?.app_metadata?.role
  const isAdmin = userRole === 'admin'

  if (requiredRole && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (requiredRole && user && !isAdmin && userRole !== requiredRole) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/dashboard/${userRole === 'student' ? 'student' : userRole === 'instructor' ? 'instructor' : 'parent'}`
    return NextResponse.redirect(redirectUrl)
  }

  return response
}
