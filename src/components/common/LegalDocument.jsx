import { Link } from 'react-router-dom'
import Seo from './Seo'
import PageHero from './PageHero'

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Shared layout for Privacy Policy / Terms pages. */
export default function LegalDocument({ document: doc }) {
  if (!doc) {
    return <PageHero title="Page not available" text="This page has not been published yet." />
  }
  return (
    <>
      <Seo title={doc.title} description={doc.intro} />
      <PageHero title={doc.title} text={doc.intro} breadcrumbs={[{ label: doc.title }]} />
      <section className="section">
        <div className="container legal">
          <nav className="legal__toc" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="legal__content">
            {doc.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)}>
                <h2>{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </section>
            ))}
            <p className="legal__updated">
              Questions? <Link to="/contact">Contact our team</Link>.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
