import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import DynamicIcon from '../common/DynamicIcon'
import { useSection } from '../../hooks/useContent'

export default function Hero() {
  const hero = useSection('home.hero')
  const cards = useSection('home.hero_cards').items

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          {hero.eyebrow && (
            <span className="hero__badge">
              <DynamicIcon name="heartHandshake" size={16} aria-hidden="true" />
              {hero.eyebrow}
            </span>
          )}
          <h1 className="hero__title">
            {hero.title} {hero.highlight && <span className="text-gradient">{hero.highlight}</span>}
          </h1>
          {hero.body && <p className="hero__text">{hero.body}</p>}
          <div className="hero__actions">
            {hero.primaryCta && (
              <Button to={hero.primaryCta.url} size="lg" icon={ArrowRight}>
                {hero.primaryCta.label}
              </Button>
            )}
            {hero.secondaryCta && (
              <Button to={hero.secondaryCta.url} size="lg" variant="outline">
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
          {hero.items.length > 0 && (
            <ul className="hero__trust">
              {hero.items.map((point) => (
                <li key={point.id || point.title}>
                  <span className="hero__trust-icon">
                    <DynamicIcon name={point.icon} size={18} aria-hidden="true" />
                  </span>
                  {point.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            {hero.image && (
              <img src={hero.image} alt={hero.imageAlt} width="1200" height="800" fetchPriority="high" />
            )}
          </div>
          {cards.slice(0, 2).map((card, i) => (
            <div key={card.id || card.title} className={`hero__float hero__float--${i === 0 ? 'top' : 'bottom'}`}>
              <span className={`hero__float-icon${i === 0 ? ' hero__float-icon--green' : ''}`}>
                <DynamicIcon name={card.icon} size={20} aria-hidden="true" />
              </span>
              <span>
                <strong>{card.title}</strong>
                {card.text && <small>{card.text}</small>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
