import { useEffect, useState } from 'react'
import { ContentContext } from './contentContext'
import { fallbackContent } from '../data/fallbackContent'
import { isApiConfigured } from '../services/api'
import { getSiteContent } from '../services/contentService'
import { LoadingState } from '../components/common/StateMessage'

/**
 * Loads website content once (from the backend when configured) and shares
 * it with every component. If the API fails, the built-in content is shown
 * so the site never breaks.
 */
export default function ContentProvider({ children }) {
  const [state, setState] = useState(() =>
    isApiConfigured
      ? { content: fallbackContent, source: 'local', status: 'loading' }
      : { content: fallbackContent, source: 'local', status: 'ready' },
  )

  useEffect(() => {
    if (!isApiConfigured) return undefined
    let active = true
    getSiteContent()
      .then(({ content, source }) => active && setState({ content, source, status: 'ready' }))
      .catch((error) => {
        if (import.meta.env.DEV) console.warn('[content] API unavailable, using built-in content:', error.message)
        if (active) setState({ content: fallbackContent, source: 'local', status: 'ready' })
      })
    return () => {
      active = false
    }
  }, [])

  if (state.status === 'loading') {
    return (
      <div className="page-loading page-loading--full">
        <LoadingState label="Loading…" />
      </div>
    )
  }

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>
}
