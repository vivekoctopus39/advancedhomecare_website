import { useSearchParams } from 'react-router-dom'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import DynamicIcon from '../components/common/DynamicIcon'
import BookingWizard from '../components/forms/BookingWizard'
import { useSection, useServices } from '../hooks/useContent'

export default function BookCare() {
  const [params] = useSearchParams()
  const hero = useSection('book.hero')
  const { getBySlug } = useServices()
  const requested = params.get('service')
  const initialService = requested && getBySlug(requested) ? requested : ''

  return (
    <>
      <Seo title={hero.eyebrow || 'Book Home Care'} description={hero.body} />
      <PageHero sectionKey="book.hero" breadcrumbs={[{ label: hero.eyebrow || 'Book Home Care' }]}>
        {hero.items.length > 0 && (
          <ul className="page-hero__points">
            {hero.items.map((item) => (
              <li key={item.id || item.title}>
                <DynamicIcon name={item.icon} size={16} aria-hidden="true" /> {item.title}
              </li>
            ))}
          </ul>
        )}
      </PageHero>

      <section className="section booking-section">
        <div className="container">
          {/* key resets the wizard if the user arrives with a different service */}
          <BookingWizard key={initialService} initialService={initialService} />
        </div>
      </section>
    </>
  )
}
