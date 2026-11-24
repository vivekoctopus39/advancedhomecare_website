/**
 * Built-in business configuration, used only when the backend API is not
 * configured. With the API connected, these values come from the admin
 * panel (Settings).
 *
 * Central business configuration.
 *
 * Every value marked `null` / empty is an intentional placeholder: real
 * business details have not been confirmed yet. The UI detects empty values
 * and renders a neutral "to be updated" state instead of invented data.
 * Later these values can come from an admin panel / CMS via the API layer.
 */
export const siteConfig = {
  name: 'Advanced Home Care',
  legalName: 'Advanced Home Care',
  shortName: 'AHC',
  tagline: 'Professional Healthcare, Right at Your Home.',
  description:
    'Compassionate and reliable home care services: home nursing, elderly care, patient care, full-time and part-time caregivers, and everyday personal assistance.',

  contact: {
    /** e.g. '+91 98765 43210' (display) — leave empty until confirmed */
    phoneDisplay: '',
    /** e.g. '+919876543210' (dialable, used for tel: links) */
    phoneDial: '',
    /** e.g. '919876543210' (international format, no +, used for WhatsApp) */
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    workingHours: '',
    /** Google Maps embed URL (https://www.google.com/maps/embed?pb=...) */
    mapEmbedUrl: '',
  },

  /** Social profile URLs — empty values render as disabled placeholders. */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    x: '',
  },
}

export const placeholderText = {
  phone: 'Phone number to be updated',
  email: 'Email address to be updated',
  address: 'Business address to be updated',
  workingHours: 'Working hours to be updated',
}
