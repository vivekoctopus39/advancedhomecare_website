import { useSiteSettings } from '../../hooks/useContent'

/** Per-page <title>/<meta>. React 19 hoists these into <head>. */
export default function Seo({ title, description }) {
  const { settings } = useSiteSettings()
  const fullTitle = title ? `${title} | ${settings.name}` : `${settings.name} | ${settings.tagline}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description || settings.description} />
    </>
  )
}
