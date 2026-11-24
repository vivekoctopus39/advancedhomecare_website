import { ArrowRight, MessageCircle } from 'lucide-react'
import Accordion from '../common/Accordion'
import Button from '../common/Button'
import SectionHeading from '../common/SectionHeading'
import { useContent, useSection } from '../../hooks/useContent'

export default function FaqSection({ limit = 6 }) {
  const heading = useSection('home.faq')
  const help = useSection('home.faq_help')
  const { faqs = [] } = useContent()
  if (!faqs.length) return null

  return (
    <section className="section section--tint" id="faq">
      <div className="container faq-section">
        <div className="faq-section__intro">
          <SectionHeading align="left" eyebrow={heading.eyebrow} title={heading.title} text={heading.body} />
          {help.title && (
            <div className="help-card">
              <span className="help-card__icon">
                <MessageCircle size={22} aria-hidden="true" />
              </span>
              <h3>{help.title}</h3>
              {help.body && <p>{help.body}</p>}
              {help.primaryCta && (
                <Button to={help.primaryCta.url} variant="secondary" size="sm" icon={ArrowRight}>
                  {help.primaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
        <div>
          <Accordion items={faqs.slice(0, limit)} defaultOpenId={faqs[0].id} />
          {limit < faqs.length && heading.primaryCta && (
            <div className="section-actions section-actions--left">
              <Button to={heading.primaryCta.url} variant="ghost" icon={ArrowRight}>
                {heading.primaryCta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
