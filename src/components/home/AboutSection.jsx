import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import DynamicIcon from '../common/DynamicIcon'
import { useSection } from '../../hooks/useContent'

export default function AboutSection({ showCta = true }) {
  const about = useSection('home.about')

  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal className="about__media">
          {about.image && <img src={about.image} alt={about.imageAlt} loading="lazy" width="1200" height="800" />}
          {about.highlight && (
            <div className="about__quote">
              <p>{about.highlight}</p>
            </div>
          )}
        </Reveal>

        <div className="about__content">
          {about.eyebrow && <span className="eyebrow">{about.eyebrow}</span>}
          <h2 className="section-title">{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="lead">
              {p}
            </p>
          ))}

          {about.items.length > 0 && (
            <div className="pillars">
              {about.items.map((pillar, i) => (
                <Reveal key={pillar.id || pillar.title} className="pillar" delay={i * 70}>
                  <span className="pillar__icon">
                    <DynamicIcon name={pillar.icon} size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {showCta && about.primaryCta && (
            <Button to={about.primaryCta.url} variant="secondary" icon={ArrowRight}>
              {about.primaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
