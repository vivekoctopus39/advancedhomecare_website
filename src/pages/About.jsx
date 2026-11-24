import { Check } from 'lucide-react'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import AboutSection from '../components/home/AboutSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import TeamSection from '../components/home/TeamSection'
import CtaBanner from '../components/home/CtaBanner'
import { useSection } from '../hooks/useContent'

export default function About() {
  const hero = useSection('about.hero')
  const story = useSection('about.story')
  const values = useSection('about.values')

  return (
    <>
      <Seo title={hero.eyebrow || 'About Us'} description={hero.body} />
      <PageHero sectionKey="about.hero" breadcrumbs={[{ label: 'About Us' }]} />

      <AboutSection showCta={false} />

      <section className="section section--tint">
        <div className="container story">
          {story.image && (
            <Reveal className="story__media">
              <img src={story.image} alt={story.imageAlt} loading="lazy" width="1200" height="800" />
            </Reveal>
          )}
          <div className="story__content">
            {story.eyebrow && <span className="eyebrow">{story.eyebrow}</span>}
            <h2 className="section-title">{story.title}</h2>
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {story.items.length > 0 && (
              <ul className="check-list">
                {story.items.map((item) => (
                  <li key={item.id || item.title}>
                    <Check size={18} aria-hidden="true" /> {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {values.items.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading section-heading--center">
              {values.eyebrow && <span className="eyebrow">{values.eyebrow}</span>}
              <h2 className="section-heading__title">{values.title}</h2>
            </div>
            <div className="values-grid">
              {values.items.map((v, i) => (
                <Reveal key={v.id || v.title} className="value-card" delay={i * 80}>
                  <span className="value-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhyChooseUs />
      <TeamSection />
      <CtaBanner />
    </>
  )
}
