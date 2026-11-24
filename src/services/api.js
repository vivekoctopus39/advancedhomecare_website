/**
 * Reusable API client.
 *
 * The base URL comes from the `VITE_API_BASE_URL` environment variable
 * (see `.env.example`), e.g. http://localhost:5000/api/public.
 * While it is empty, `isApiConfigured` is false, no network requests are
 * made, and the site renders its built-in content.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export const isApiConfigured = Boolean(API_BASE_URL)

/** Origin of the backend (where /uploads images are served). */
export const API_ORIGIN = isApiConfigured ? new URL(API_BASE_URL).origin : ''

/** Turn a backend image path (/uploads/x.jpg) into a full URL. */
export const assetUrl = (url) => (url && url.startsWith('/uploads/') ? `${API_ORIGIN}${url}` : url || '')

export const endpoints = {
  bootstrap: '/bootstrap',
  enquiries: '/enquiries',
  bookings: '/booking-enquiries',
}

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Thin fetch wrapper with JSON handling, timeout and consistent errors.
 * Only call this when `isApiConfigured` is true.
 */
export async function apiRequest(path, { method = 'GET', body, headers, timeout = 15000 } = {}) {
  if (!isApiConfigured) {
    throw new ApiError('API base URL is not configured.')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    const isJson = response.headers.get('content-type')?.includes('application/json')
    const data = isJson ? await response.json() : null

    if (!response.ok) {
      throw new ApiError(data?.message || `Request failed (${response.status})`, {
        status: response.status,
        data,
      })
    }
    return data
  } catch (error) {
    if (error.name === 'AbortError') throw new ApiError('The request timed out. Please try again.')
    if (error instanceof ApiError) throw error
    throw new ApiError('Network error. Please check your connection and try again.')
  } finally {
    clearTimeout(timer)
  }
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
  post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
}
