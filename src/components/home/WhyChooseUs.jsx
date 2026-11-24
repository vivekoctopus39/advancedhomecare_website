import { Phone } from 'lucide-react'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import SectionHeading from '../common/SectionHeading'
import DynamicIcon from '../common/DynamicIcon'
import { useSection, useSiteSettings } from '../../hooks/useContent'

function FeaturedCard({ item }) {
  const { tel, contact } = useSiteSettings()
  return (
    <Reveal className="feature-card feature-card--featured">
      <span className="feature-card__icon">
        <DynamicIcon name={item.icon} size={30} aria-hidden="true" />
      </span>
      <div className="feature-card__body">
        {item.badge && <span className="feature-card__badge">{item.badge}</span>}
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
      <Button
        {...(tel ? { href: tel } : { to: '/contact' })}
        variant="light"
        icon={Phone}
        iconPosition="start"
        className="feature-card__cta"
      >
        {tel ? `Call ${contact.phoneDisplay}` : 'Contact Our Team'}
      </Button>
    </Reveal>
  )
}

export default function WhyChooseUs() {
  const why = useSection('home.why')
  // Number only the regular cards (featured cards are full-width banners).
  const numbered = why.items.filter((item) => !item.featured)

  return (
    <section className="section why" id="why-choose-us">
      <div className="container">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} text={why.body} />
        <div className="why__grid">
          {why.items.map((item) => {
            if (item.featured) return <FeaturedCard key={item.id || item.title} item={item} />
            const index = numbered.indexOf(item) + 1
            return (
              <Reveal key={item.id || item.title} className="feature-card" delay={((index - 1) % 3) * 80}>
                <span className="feature-card__icon">
                  <DynamicIcon name={item.icon} size={26} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="feature-card__index" aria-hidden="true">
                  {String(index).padStart(2, '0')}
                </span>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
