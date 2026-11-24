import { ArrowRight, Check } from 'lucide-react'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import DynamicIcon from '../common/DynamicIcon'
import { useContent, useSection } from '../../hooks/useContent'

export default function CareOptions() {
  const care = useSection('home.care_options')
  const { careDurations = [] } = useContent()

  return (
    <section className="section care-options" id="care-options">
      <div className="container care-options__grid">
        <div className="care-options__intro">
          {care.eyebrow && <span className="eyebrow">{care.eyebrow}</span>}
          <h2 className="section-title">{care.title}</h2>
          {care.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="lead">
              {p}
            </p>
          ))}
          {care.items.length > 0 && (
            <ul className="check-list">
              {care.items.map((item) => (
                <li key={item.id || item.title}>
                  <Check size={18} aria-hidden="true" /> {item.title}
                </li>
              ))}
            </ul>
          )}
          {care.image && (
            <div className="care-options__image">
              <img src={care.image} alt={care.imageAlt} loading="lazy" width="1200" height="800" />
            </div>
          )}
        </div>

        <div className="care-options__panel">
          <div className="duration-grid">
            {careDurations.map((option, i) => (
              <Reveal key={option.value} className="duration-card" delay={(i % 2) * 80}>
                <span className="duration-card__icon">
                  <DynamicIcon name={option.icon} size={22} aria-hidden="true" />
                </span>
                <h3>{option.label}</h3>
                <p>{option.text}</p>
              </Reveal>
            ))}
          </div>
          {(care.highlight || care.primaryCta) && (
            <div className="care-options__cta">
              {care.highlight && <p>{care.highlight}</p>}
              {care.primaryCta && (
                <Button to={care.primaryCta.url} icon={ArrowRight}>
                  {care.primaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
