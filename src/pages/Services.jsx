import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import { EmptyState } from '../components/common/StateMessage'
import ServiceCard from '../components/services/ServiceCard'
import CareOptions from '../components/home/CareOptions'
import CtaBanner from '../components/home/CtaBanner'
import { useSection, useServices } from '../hooks/useContent'

export default function Services() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const query = params.get('q') || ''
  const { services, serviceCategories } = useServices()
  const hero = useSection('services.hero')

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'all') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter((s) => {
      const inCategory = category === 'all' || s.category === category
      const matches =
        !q || [s.title, s.summary, ...s.features].some((text) => text.toLowerCase().includes(q))
      return inCategory && matches
    })
  }, [services, category, query])

  return (
    <>
      <Seo title={hero.eyebrow || 'Our Services'} description={hero.body} />
      <PageHero sectionKey="services.hero" breadcrumbs={[{ label: hero.eyebrow || 'Our Services' }]} />

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-bar__chips" role="group" aria-label="Filter by category">
              {serviceCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`chip${category === c.id ? ' is-active' : ''}`}
                  aria-pressed={category === c.id}
                  onClick={() => updateParam('category', c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className="search-input">
              <Search size={18} aria-hidden="true" />
              <span className="visually-hidden">Search services</span>
              <input
                type="search"
                placeholder="Search services…"
                value={query}
                onChange={(e) => updateParam('q', e.target.value)}
              />
              {query && (
                <button type="button" onClick={() => updateParam('q', '')} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          <p className="results-count" aria-live="polite">
            Showing {filtered.length} of {services.length} services
          </p>

          {filtered.length ? (
            <div className="services-grid">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No services match your search"
              text="Try a different keyword or category, or contact us to discuss your specific needs."
              action={
                <button type="button" className="btn btn--outline btn--sm" onClick={() => setParams({}, { replace: true })}>
                  Clear filters
                </button>
              }
            />
          )}
        </div>
      </section>

      <CareOptions />
      <CtaBanner />
    </>
  )
}
