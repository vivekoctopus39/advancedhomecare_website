import { Link } from 'react-router-dom'
import { ArrowUp, Phone } from 'lucide-react'
import { WhatsAppIcon } from '../common/SocialIcons'
import { useSiteSettings } from '../../hooks/useContent'
import { useScrolledPast } from '../../hooks/useScrollPosition'

/**
 * Floating WhatsApp / Call / Back-to-top controls.
 * Until a phone number is configured, WhatsApp and Call route to the
 * Contact page instead of linking to an invented number.
 */
export default function FloatingActions() {
  const showTop = useScrolledPast(600)
  const { tel, whatsApp } = useSiteSettings()
  const wa = whatsApp()

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const scrollTop = () => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' })

  return (
    <div className="floating-actions">
      <button
        type="button"
        className={`fab fab--top${showTop ? ' is-visible' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={20} />
      </button>

      {tel ? (
        <a href={tel} className="fab fab--call" aria-label="Call now">
          <Phone size={20} />
        </a>
      ) : (
        <Link to="/contact" className="fab fab--call" aria-label="Call now (see contact options)">
          <Phone size={20} />
        </Link>
      )}

      {wa ? (
        <a href={wa} className="fab fab--whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <WhatsAppIcon />
        </a>
      ) : (
        <Link to="/contact" className="fab fab--whatsapp" aria-label="WhatsApp (see contact options)">
          <WhatsAppIcon />
        </Link>
      )}
    </div>
  )
}
