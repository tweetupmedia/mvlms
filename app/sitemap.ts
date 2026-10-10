import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tutoring.courses'
  return ['', '/how-it-works', '/for-families', '/features', '/syllabus', '/auth/login', '/auth/signup'].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: 'weekly', priority: path === '' ? 1 : 0.7 }))
}
