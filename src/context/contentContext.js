import { createContext } from 'react'
import { fallbackContent } from '../data/fallbackContent'

export const ContentContext = createContext({ content: fallbackContent, source: 'local', status: 'ready' })
