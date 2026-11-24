import { useSiteSettings } from '../../hooks/useContent'

/* Brand marks drawn inline (lucide-react v1 no longer ships brand icons). */
const paths = {
  facebook: (
    <path d="M14 8.5V6.8c0-.8.5-1 1-1h2V2.2L14.3 2C11.4 2 10.5 4 10.5 6v2.5H8V12h2.5v10H14V12h2.7l.4-3.5H14Z" fill="currentColor" />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </g>
  ),
  linkedin: (
    <path d="M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3v12H3V9Zm6 0h2.9v1.7c.5-.9 1.6-2 3.6-2 3.4 0 4.5 2.1 4.5 5.4V21h-3v-6.2c0-1.6-.3-3-2-3-1.8 0-2.1 1.3-2.1 3V21H9V9Z" fill="currentColor" />
  ),
  youtube: (
    <path d="M22 8.2a3 3 0 0 0-2-2.1C18.2 5.6 12 5.6 12 5.6s-6.2 0-8 .5a3 3 0 0 0-2 2.1A31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2 2.1c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 0 0 2-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10 15.2V8.8l5.3 3.2-5.3 3.2Z" fill="currentColor" />
  ),
  x: (
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" fill="currentColor" />
  ),
}

const labels = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', youtube: 'YouTube', x: 'X' }

export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"
      />
    </svg>
  )
}

export default function SocialIcons() {
  const { social } = useSiteSettings()
  return (
    <ul className="social-icons">
      {Object.keys(paths).map((key) => {
        const url = social[key]
        const icon = (
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            {paths[key]}
          </svg>
        )
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={labels[key]}>
                {icon}
              </a>
            ) : (
              <span
                className="social-icons__placeholder"
                role="img"
                aria-label={`${labels[key]} (link coming soon)`}
                title={`${labels[key]} link coming soon`}
              >
                {icon}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
