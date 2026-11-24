import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/common/Seo'
import PageHero from '../components/common/PageHero'
import { WhatsAppIcon } from '../components/common/SocialIcons'
import ContactSection from '../components/home/ContactSection'
import { placeholderText } from '../config/site'
import { useSection, useSiteSettings } from '../hooks/useContent'

export default function Contact() {
  const { contact, tel, whatsApp } = useSiteSettings()
  const hero = useSection('contact.hero')
  const wa = whatsApp()

  const cards = [
    {
      icon: Phone,
      title: 'Call Us',
      value: contact.phoneDisplay || placeholderText.phone,
      href: tel,
      cta: 'Call now',
    },
    {
      icon: WhatsAppIcon,
      title: 'WhatsApp',
      value: contact.phoneDisplay || 'WhatsApp number to be updated',
      href: wa,
      cta: 'Chat on WhatsApp',
      external: true,
    },
    {
      icon: Mail,
      title: 'Email',
      value: contact.email || placeholderText.email,
      href: contact.email ? `mailto:${contact.email}` : null,
      cta: 'Send email',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: contact.workingHours || placeholderText.workingHours,
    },
    {
      icon: MapPin,
      title: 'Address',
      value: [contact.address, contact.city].filter(Boolean).join(', ') || placeholderText.address,
    },
  ]

  return (
    <>
      <Seo title={hero.eyebrow || 'Contact Us'} description={hero.body} />
      <PageHero sectionKey="contact.hero" breadcrumbs={[{ label: hero.eyebrow || 'Contact Us' }]} />

      <section className="section section--compact">
        <div className="container contact-cards">
          {cards.map(({ icon: Icon, title, value, href, cta, external }) => (
            <div key={title} className="contact-card">
              <span className="contact-card__icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h2>{title}</h2>
              <p className={href || !value.includes('to be updated') ? '' : 'is-placeholder'}>{value}</p>
              {href && (
                <a href={href} className="text-link" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <ContactSection showDetails={false} />
    </>
  )
}
