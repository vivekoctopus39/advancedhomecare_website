import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import SectionHeading from '../common/SectionHeading'
import DynamicIcon from '../common/DynamicIcon'
import { useSection } from '../../hooks/useContent'

export default function ProcessSteps({ showCta = true, headingAs = 'h2' }) {
  const process = useSection('home.process')

  return (
    <section className="section process" id="how-it-works">
      <div className="container">
        <SectionHeading eyebrow={process.eyebrow} title={process.title} text={process.body} inverse as={headingAs} />
        <ol className="process__list">
          {process.items.map((step, i) => (
            <Reveal as="li" key={step.id || step.title} className="process-step" delay={i * 100}>
              <div className="process-step__marker">
                <span className="process-step__number">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <span className="process-step__icon">
                <DynamicIcon name={step.icon} size={24} aria-hidden="true" />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
        {showCta && process.primaryCta && (
          <div className="section-actions">
            <Button to={process.primaryCta.url} variant="light" icon={ArrowRight}>
              {process.primaryCta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
