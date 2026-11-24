import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Check, Phone, UserRound } from 'lucide-react'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import Button from '../components/common/Button'
import { EmptyState } from '../components/common/StateMessage'
import ServiceCard from '../components/services/ServiceCard'
import CtaBanner from '../components/home/CtaBanner'
import { useContent, useSection, useServices, useSiteSettings } from '../hooks/useContent'
import DynamicIcon from '../components/common/DynamicIcon'

export default function ServiceDetails() {
  const { slug } = useParams()
  const { services, getBySlug, getRelated } = useServices()
  const { careDurations = [] } = useContent()
  const processSteps = useSection('home.process').items
  const { tel, contact } = useSiteSettings()
  const service = getBySlug(slug)

  if (!service) {
    return (
      <>
        <Seo title="Service not found" />
        <PageHero title="Service Not Found" breadcrumbs={[{ label: 'Our Services', to: '/services' }, { label: 'Not found' }]} />
        <section className="section">
          <div className="container">
            <EmptyState
              title="We couldn’t find that service"
              text="It may have been renamed or moved. Browse all our home care services instead."
              action={
                <Button to="/services" icon={ArrowRight}>
                  View All Services
                </Button>
              }
            />
          </div>
        </section>
      </>
    )
  }

  const related = getRelated(service)

  return (
    <>
      <Seo title={service.title} description={service.summary} />
      <PageHero
        eyebrow="Our Services"
        title={service.title}
        text={service.summary}
        breadcrumbs={[{ label: 'Our Services', to: '/services' }, { label: service.title }]}
      />

      <section className="section">
        <div className="container service-detail">
          <div className="service-detail__main">
            <div className="service-detail__media">
              <img src={service.image} alt={service.imageAlt} width="1200" height="800" />
              <span className="service-detail__badge">
                <DynamicIcon name={service.icon} size={22} aria-hidden="true" />
              </span>
            </div>

            <h2 className="service-detail__heading">Overview</h2>
            <p className="lead">{service.description}</p>

            <div className="detail-columns">
              <div className="detail-box">
                <h3>What’s Included</h3>
                <ul className="check-list">
                  {service.features.map((f) => (
                    <li key={f}>
                      <Check size={18} aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-box detail-box--tint">
                <h3>Who It’s For</h3>
                <ul className="check-list">
                  {service.suitableFor.map((f) => (
                    <li key={f}>
                      <UserRound size={18} aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="service-detail__heading">Available Care Durations</h2>
            <ul className="duration-pills">
              {careDurations.map((d) => (
                <li key={d.value}>{d.label}</li>
              ))}
            </ul>
            <p className="muted">
              Availability depends on location and requirements. Our team will confirm suitable options when we speak
              with you.
            </p>

            <h2 className="service-detail__heading">How to Get Started</h2>
            <ol className="mini-steps">
              {processSteps.map((s, i) => (
                <li key={s.id || s.title}>
                  <span>{i + 1}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="service-detail__aside">
            <div className="aside-card aside-card--brand">
              <h3>Book {service.shortTitle || service.title}</h3>
              <p>Share your requirements and our team will contact you to discuss care options.</p>
              <Button to={`/book-care?service=${service.slug}`} variant="light" block icon={CalendarCheck} iconPosition="start">
                Book This Service
              </Button>
              <Button
                {...(tel ? { href: tel } : { to: '/contact' })}
                variant="outline-light"
                block
                icon={Phone}
                iconPosition="start"
              >
                {tel ? `Call ${contact.phoneDisplay}` : 'Contact Our Team'}
              </Button>
            </div>

            <nav className="aside-card" aria-label="All services">
              <h3>All Services</h3>
              <ul className="aside-links">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className={s.slug === service.slug ? 'is-active' : undefined}>
                      {s.title}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">Related Services</span>
            <h2 className="section-heading__title">You May Also Need</h2>
          </div>
          <div className="services-grid">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} compact />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
