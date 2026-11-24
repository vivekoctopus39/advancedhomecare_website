import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import Logo from '../common/Logo'
import Button from '../common/Button'
import { useScrolledPast } from '../../hooks/useScrollPosition'
import { useMenu, useSiteSettings } from '../../hooks/useContent'

/** Hash links (e.g. "/#why-choose-us") are active only when the hash matches. */
function isLinkActive(to, location) {
  const [path, hash] = to.split('#')
  if (hash) return location.pathname === (path || '/') && location.hash === `#${hash}`
  if (path === '/') return location.pathname === '/' && !location.hash
  return location.pathname === path || location.pathname.startsWith(`${path}/`)
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolledPast(8)
  const location = useLocation()
  const [lastLocationKey, setLastLocationKey] = useState(location.key)

  // Close the mobile menu whenever the route changes.
  if (location.key !== lastLocationKey) {
    setLastLocationKey(location.key)
    setOpen(false)
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 1080 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const { contact, tel: phone } = useSiteSettings()
  const mainNav = useMenu('header').items
  const primaryCta = useMenu('header_cta').items[0] || { label: 'Book Home Care', to: '/book-care' }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__inner">
        <Logo />

        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={() => (isLinkActive(item.to, location) ? 'is-active' : undefined)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Button to={primaryCta.to} size="sm" className="site-header__cta">
            {primaryCta.label}
          </Button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} inert={!open}>
        <nav aria-label="Mobile navigation" className="container">
          <ul className="mobile-menu__list">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={() => (isLinkActive(item.to, location) ? 'is-active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__actions">
            <Button to={primaryCta.to} block onClick={() => setOpen(false)}>
              {primaryCta.label}
            </Button>
            <Button
              {...(phone ? { href: phone } : { to: '/contact' })}
              variant="outline"
              block
              icon={Phone}
              iconPosition="start"
              onClick={() => setOpen(false)}
            >
              {phone ? `Call ${contact.phoneDisplay}` : 'Contact Our Team'}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
