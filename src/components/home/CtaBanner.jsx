import { ArrowRight, Phone } from 'lucide-react'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import { useSection } from '../../hooks/useContent'

/** Call-to-action banner. `sectionKey` picks which editable section to show. */
export default function CtaBanner({ sectionKey = 'home.cta' }) {
  const cta = useSection(sectionKey)

  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-banner">
          <div className="cta-banner__content">
            <h2>{cta.title}</h2>
            {cta.body && <p>{cta.body}</p>}
          </div>
          <div className="cta-banner__actions">
            {cta.primaryCta && (
              <Button to={cta.primaryCta.url} variant="light" size="lg" icon={ArrowRight}>
                {cta.primaryCta.label}
              </Button>
            )}
            {cta.secondaryCta && (
              <Button to={cta.secondaryCta.url} variant="outline-light" size="lg" icon={Phone} iconPosition="start">
                {cta.secondaryCta.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
