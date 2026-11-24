import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { EmptyState } from '../common/StateMessage'
import { useContent, useSection } from '../../hooks/useContent'

const AUTOPLAY_MS = 6500

function Stars({ rating }) {
  return (
    <div className="stars" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={18} className={i < rating ? 'is-filled' : ''} aria-hidden="true" />
      ))}
    </div>
  )
}

function Slider({ items }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const count = items.length

  const step = useCallback((delta) => setIndex((i) => (((i + delta) % count) + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setTimeout(() => step(1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, count, step])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="slider__viewport">
        <div className="slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((t, i) => (
            <figure
              key={t.id}
              className="testimonial"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <span className="testimonial__quote" aria-hidden="true">
                <Quote size={28} />
              </span>
              {t.isSample && <span className="sample-badge">Sample testimonial</span>}
              <Stars rating={t.rating} />
              <blockquote>
                <p>{t.feedback}</p>
              </blockquote>
              <figcaption>
                <span className="testimonial__avatar" aria-hidden="true">
                  {t.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(-2)
                    .join('')}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <small>{t.relation}</small>
                </span>
                <span className="testimonial__service">{t.service}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="slider__controls">
          <button type="button" className="slider__arrow" onClick={() => step(-1)} aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>
          <div className="slider__dots">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={`slider__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
          <button type="button" className="slider__arrow" onClick={() => step(1)} aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Testimonials() {
  const heading = useSection('home.testimonials')
  const { testimonials = [] } = useContent()
  const hasSamples = testimonials.some((t) => t.isSample)

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container testimonials__grid">
        <div className="testimonials__intro">
          <SectionHeading align="left" eyebrow={heading.eyebrow} title={heading.title} text={heading.body} />
          {hasSamples && heading.highlight && <p className="notice notice--info">{heading.highlight}</p>}
        </div>
        <div>
          {testimonials.length === 0 ? (
            <EmptyState title="Reviews coming soon" text="Customer feedback will appear here." />
          ) : (
            <Slider items={testimonials} />
          )}
        </div>
      </div>
    </section>
  )
}
