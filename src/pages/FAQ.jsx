import { useMemo, useState } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import Accordion from '../components/common/Accordion'
import Button from '../components/common/Button'
import { EmptyState } from '../components/common/StateMessage'
import CtaBanner from '../components/home/CtaBanner'
import { useContent, useSection } from '../hooks/useContent'

export default function FAQ() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const { faqs = [], faqCategories: categories = [] } = useContent()
  const hero = useSection('faq.hero')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqs.filter(
      (f) =>
        (category === 'all' || f.category === category) &&
        (!q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)),
    )
  }, [faqs, query, category])

  return (
    <>
      <Seo title={hero.eyebrow || 'FAQs'} description={hero.body} />
      <PageHero sectionKey="faq.hero" breadcrumbs={[{ label: hero.eyebrow || 'FAQs' }]} />

      <section className="section">
        <div className="container container--narrow">
          <div className="filter-bar filter-bar--stack">
            <label className="search-input search-input--lg">
              <Search size={18} aria-hidden="true" />
              <span className="visually-hidden">Search questions</span>
              <input
                type="search"
                placeholder="Search questions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </label>
            <div className="filter-bar__chips" role="group" aria-label="Filter questions">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`chip${category === c.id ? ' is-active' : ''}`}
                  aria-pressed={category === c.id}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length ? (
            <Accordion key={`${category}-${query}`} items={filtered} defaultOpenId={filtered[0].id} />
          ) : (
            <EmptyState
              title="No matching questions"
              text="Try another keyword, or ask our team directly."
              action={
                <Button to="/contact" variant="outline" size="sm" icon={ArrowRight}>
                  Ask a Question
                </Button>
              }
            />
          )}
        </div>
      </section>

      <CtaBanner sectionKey="faq.cta" />
    </>
  )
}
