export type PortalRole = 'learner' | 'family' | 'instructor' | 'admin'

const PORTALS: Record<string, { role: PortalRole; label: string; dashboard: string }> = {
  'learner.tutoring.courses': { role: 'learner', label: 'Learner', dashboard: '/dashboard/student' },
  'family.tutoring.courses': { role: 'family', label: 'Family', dashboard: '/dashboard/parent' },
  'instructor.tutoring.courses': { role: 'instructor', label: 'Instructor', dashboard: '/dashboard/instructor' },
  'admin.tutoring.courses': { role: 'admin', label: 'Admin', dashboard: '/dashboard/admin' },
}

export function getPortalConfig() {
  const hostname = typeof window === 'undefined' ? '' : window.location.hostname
  return PORTALS[hostname] ?? { role: 'family' as PortalRole, label: 'Family', dashboard: '/dashboard/parent' }
}

export function portalUrl(hostname: string, path: string) {
  return `https://${hostname}${path}`
}

export const PORTAL_HOSTS = {
  learner: 'learner.tutoring.courses',
  family: 'family.tutoring.courses',
  instructor: 'instructor.tutoring.courses',
  admin: 'admin.tutoring.courses',
}
