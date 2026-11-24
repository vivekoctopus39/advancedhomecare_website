import { MapPin } from 'lucide-react'
import ContactInfoList from '../common/ContactInfoList'
import SectionHeading from '../common/SectionHeading'
import EnquiryForm from '../forms/EnquiryForm'
import { useSection, useSiteSettings } from '../../hooks/useContent'

// Only Google Maps embed URLs are rendered in the iframe.
const MAP_EMBED_RE = /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/

export function MapEmbed() {
  const { contact, settings } = useSiteSettings()
  if (contact.mapEmbedUrl && MAP_EMBED_RE.test(contact.mapEmbedUrl)) {
    return (
      <div className="map-embed">
        <iframe
          src={contact.mapEmbedUrl}
          title={`${settings.name} location map`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <div className="map-embed map-embed--placeholder">
      <MapPin size={28} aria-hidden="true" />
      <p>Our location map will appear here once the business address is confirmed.</p>
    </div>
  )
}

export default function ContactSection({ headingAs = 'h2', showDetails = true }) {
  const contact = useSection('home.contact')
  const form = useSection('contact.form')

  return (
    <section className="section contact" id="enquiry">
      <div className="container contact__grid">
        <div className="contact__info">
          <SectionHeading align="left" eyebrow={contact.eyebrow} title={contact.title} text={contact.body} as={headingAs} />
          {showDetails && (
            <div className="contact__card">
              <ContactInfoList />
            </div>
          )}
          <MapEmbed />
        </div>
        <EnquiryForm title={form.title} intro={form.body} />
      </div>
    </section>
  )
}
