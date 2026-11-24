import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useSection } from '../../hooks/useContent'

/**
 * Banner used at the top of inner pages, with breadcrumbs.
 * Pass `sectionKey` to load eyebrow/title/text from the editable sections;
 * explicit props override them.
 */
export default function PageHero({ sectionKey, eyebrow, title, text, breadcrumbs = [], children }) {
  const section = useSection(sectionKey || '')
  const heading = {
    eyebrow: eyebrow ?? (sectionKey ? section.eyebrow : ''),
    title: title ?? section.title,
    text: text ?? (sectionKey ? section.body : ''),
  }

  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label}>
                <ChevronRight size={14} aria-hidden="true" />
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {heading.eyebrow && <span className="eyebrow eyebrow--light">{heading.eyebrow}</span>}
        <h1 className="page-hero__title">{heading.title}</h1>
        {heading.text && <p className="page-hero__text">{heading.text}</p>}
        {children}
      </div>
    </section>
  )
}
