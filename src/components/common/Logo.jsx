import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../hooks/useContent'

/** Site logo. The image is set from the admin panel (Settings → Logo). */
export default function Logo({ inverse = false, onClick }) {
  const { settings, logoUrl } = useSiteSettings()
  return (
    <Link
      to="/"
      className={`logo${inverse ? ' logo--inverse' : ''}`}
      aria-label={`${settings.name}, home`}
      onClick={onClick}
    >
      <img src={logoUrl || '/logocare.jpeg'} alt="" className="logo__mark" height="100" />
    </Link>
  )
}
