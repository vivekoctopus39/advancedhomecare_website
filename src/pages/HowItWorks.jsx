import { ArrowRight } from 'lucide-react'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import Button from '../components/common/Button'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import DynamicIcon from '../components/common/DynamicIcon'
import ProcessSteps from '../components/home/ProcessSteps'
import CareOptions from '../components/home/CareOptions'
import FaqSection from '../components/home/FaqSection'
import CtaBanner from '../components/home/CtaBanner'
import { useSection } from '../hooks/useContent'

export default function HowItWorks() {
  const hero = useSection('how.hero')
  const prepare = useSection('how.prepare')

  return (
    <>
      <Seo title={hero.eyebrow || 'How It Works'} description={hero.body} />
      <PageHero sectionKey="how.hero" breadcrumbs={[{ label: hero.eyebrow || 'How It Works' }]} />

      <ProcessSteps showCta={false} />

      {prepare.items.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow={prepare.eyebrow} title={prepare.title} text={prepare.body} />
            <div className="prepare-grid">
              {prepare.items.map((item, i) => (
                <Reveal key={item.id || item.title} className="feature-card" delay={i * 80}>
                  <span className="feature-card__icon">
                    <DynamicIcon name={item.icon} size={26} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
            {prepare.primaryCta && (
              <div className="section-actions">
                <Button to={prepare.primaryCta.url} icon={ArrowRight}>
                  {prepare.primaryCta.label}
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      <CareOptions />
      <FaqSection limit={5} />
      <CtaBanner />
    </>
  )
}
