import { siteConfig } from '../config/site'
import { careDurations, teamRoles } from './content'
import { faqs } from './faqs'
import { privacyPolicy, termsAndConditions } from './legal'
import { footerNav, mainNav, primaryCta } from './navigation'
import { sections } from './sections'
import { serviceCategories, services } from './services'
import { testimonials } from './testimonials'
// Logo file lives in /public, so it is referenced by path, not imported.
const logoUrl = '/logocare.jpeg'

/**
 * Built-in content in the same shape as the backend's
 * GET /api/public/bootstrap response. Used when the API is not configured
 * or cannot be reached, so the site always renders.
 */
const toSection = (s) => ({
  ...s,
  paragraphs: (s.body || '').split(/\n\s*\n/).filter(Boolean),
  primaryCta: s.primaryCta || null,
  secondaryCta: s.secondaryCta || null,
  items: s.items || [],
})

export const fallbackContent = {
  settings: {
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    shortName: siteConfig.shortName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    logoUrl,
    footerAbout:
      'Advanced Home Care brings compassionate nursing, caregiving and everyday assistance to your home, so the people you love can recover and live comfortably where they feel most at ease.',
    contact: siteConfig.contact,
  },
  social: siteConfig.social,
  navigation: {
    header: { title: 'Main menu', items: mainNav },
    header_cta: { title: 'Header button', items: [primaryCta] },
    footer_company: { title: footerNav.company.title, items: footerNav.company.links },
    footer_services: { title: footerNav.services.title, items: footerNav.services.links },
    footer_support: { title: footerNav.support.title, items: footerNav.support.links },
  },
  sections: Object.fromEntries(Object.entries(sections).map(([key, s]) => [key, toSection(s)])),
  services,
  serviceCategories,
  careDurations,
  faqCategories: [
    { id: 'all', label: 'All' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Booking & Duration' },
    { id: 'support', label: 'Support' },
  ],
  faqs,
  testimonials,
  team: teamRoles,
  legal: {
    'privacy-policy': privacyPolicy,
    terms: termsAndConditions,
  },
}
