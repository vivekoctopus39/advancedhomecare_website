import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import SectionHeading from '../common/SectionHeading'
import ServiceCard from '../services/ServiceCard'
import { useSection, useServices } from '../../hooks/useContent'

export default function ServicesSection({ limit }) {
  const heading = useSection('home.services')
  const { services } = useServices()
  const list = limit ? services.slice(0, limit) : services

  return (
    <section className="section section--tint" id="services">
      <div className="container">
        <SectionHeading eyebrow={heading.eyebrow} title={heading.title} text={heading.body} />
        <div className="services-grid">
          {list.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        {limit && limit < services.length && (
          <div className="section-actions">
            <Button to="/services" variant="outline" icon={ArrowRight}>
              View All {services.length} Services
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
