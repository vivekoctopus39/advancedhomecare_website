import { useContext, useMemo } from 'react'
import { ContentContext } from '../context/contentContext'
import { sections as defaultSections } from '../data/sections'
import { enquiryFields } from '../data/enquiryFields'
import { assetUrl } from '../services/api'

/** All website content (settings, services, sections, FAQs, …). */
export function useContent() {
  return useContext(ContentContext).content
}

const EMPTY = { items: [], paragraphs: [] }

/**
 * One editable page section with safe defaults. If the admin has not set a
 * field (or the section is missing) the built-in text is used.
 */
export function useSection(key) {
  const { sections } = useContent()
  const fromApi = sections?.[key]
  const local = defaultSections[key] || EMPTY
  const s = fromApi || { ...local, paragraphs: (local.body || '').split(/\n\s*\n/).filter(Boolean) }
  return {
    ...s,
    image: assetUrl(s.image),
    items: s.items || [],
    paragraphs: s.paragraphs || [],
  }
}

/** Site settings + derived contact links. */
export function useSiteSettings() {
  const { settings, social } = useContent()
  const contact = settings?.contact || {}
  const tel = contact.phoneDial ? `tel:${contact.phoneDial}` : null
  const whatsApp = (message = 'Hello, I would like to enquire about home care services.') =>
    contact.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}` : null
  return { settings, contact, social: social || {}, tel, whatsApp, logoUrl: assetUrl(settings?.logoUrl) }
}

/** Services with image URLs resolved, plus lookup helpers. */
export function useServices() {
  const { services = [], serviceCategories = [] } = useContent()
  const list = useMemo(() => services.map((s) => ({ ...s, image: assetUrl(s.image) })), [services])
  const getBySlug = (slug) => list.find((s) => s.slug === slug)
  const getRelated = (service, limit = 3) =>
    list
      .filter((s) => s.slug !== service.slug)
      .sort((a, b) => Number(b.category === service.category) - Number(a.category === service.category))
      .slice(0, limit)
  return { services: list, serviceCategories, getBySlug, getRelated }
}

/** Enquiry field schema with service / duration options from live content. */
export function useEnquiryFields() {
  const { services = [], careDurations = [] } = useContent()
  return {
    ...enquiryFields,
    service: { ...enquiryFields.service, options: services.map((s) => ({ value: s.slug, label: s.title })) },
    careDuration: {
      ...enquiryFields.careDuration,
      options: careDurations.map((d) => ({ value: d.value, label: d.label })),
    },
  }
}

/** Navigation menu by code (header, header_cta, footer_company, …). */
export function useMenu(code) {
  const { navigation } = useContent()
  return navigation?.[code] || { title: '', items: [] }
}
