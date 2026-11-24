import Reveal from '../common/Reveal'
import DynamicIcon from '../common/DynamicIcon'
import { useSection } from '../../hooks/useContent'

/** Stat cards. A number is shown only when the admin sets a value. */
export default function TrustStats() {
  const { items } = useSection('home.trust_stats')
  if (!items.length) return null

  return (
    <section className="trust-stats" aria-label="Why families trust us">
      <div className="container">
        <div className="trust-stats__grid">
          {items.map((stat, i) => (
            <Reveal key={stat.id || stat.title} className="stat-card" delay={i * 80}>
              <span className="stat-card__icon">
                <DynamicIcon name={stat.icon} size={24} aria-hidden="true" />
              </span>
              <div>
                {stat.value && <p className="stat-card__value">{stat.value}</p>}
                <h3 className="stat-card__title">{stat.title}</h3>
                {stat.text && <p className="stat-card__text">{stat.text}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
