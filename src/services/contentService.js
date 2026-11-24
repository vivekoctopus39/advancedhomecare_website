import { api, endpoints, isApiConfigured } from './api'
import { fallbackContent } from '../data/fallbackContent'

/**
 * Loads all website content. With the backend configured it reads
 * GET /bootstrap (managed from the admin panel); otherwise it uses the
 * built-in content.
 */
export async function getSiteContent() {
  if (!isApiConfigured) return { content: fallbackContent, source: 'local' }
  const { data } = await api.get(endpoints.bootstrap)
  return { content: data, source: 'api' }
}
