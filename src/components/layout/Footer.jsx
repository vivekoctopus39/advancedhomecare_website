import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import SocialIcons from '../common/SocialIcons'
import ContactInfoList from '../common/ContactInfoList'
import { useMenu, useSiteSettings } from '../../hooks/useContent'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { settings } = useSiteSettings()
  const columns = [useMenu('footer_company'), useMenu('footer_services'), useMenu('footer_support')].filter(
    (col) => col.items.length,
  )

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo inverse />
          {settings.footerAbout && <p>{settings.footerAbout}</p>}
          <SocialIcons />
        </div>

        {columns.map((col) => (
          <div key={col.title} className="site-footer__col">
            <h2 className="site-footer__title">{col.title}</h2>
            <ul>
              {col.items.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="site-footer__col site-footer__contact">
          <h2 className="site-footer__title">Get in Touch</h2>
          <ContactInfoList variant="footer" />
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © {YEAR} {settings.legalName}. All rights reserved.
          </p>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
