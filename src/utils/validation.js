const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

/**
 * Validates one value against a rules object from `data/enquiryFields.js`.
 * Returns an error message, or '' when valid.
 */
export function validateField(field, rawValue) {
  const { rules = {}, label } = field
  const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue
  const name = label.replace(/\s*\(optional\)/i, '')

  if (!value) return rules.required ? `${name} is required.` : ''

  if (rules.minLength && value.length < rules.minLength)
    return `${name} must be at least ${rules.minLength} characters.`
  if (rules.maxLength && value.length > rules.maxLength)
    return `${name} must be under ${rules.maxLength} characters.`

  if (rules.email && !EMAIL_RE.test(value)) return 'Please enter a valid email address.'

  if (rules.phone) {
    // Strip a +91 / 91 / 0 prefix only when it is in addition to 10 digits,
    // so numbers that themselves start with 91 (e.g. 9123456780) stay valid.
    const digits = value.replace(/[\s()-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '')
    if (!/^[6-9]\d{9}$/.test(digits)) return 'Please enter a valid 10-digit mobile number.'
  }

  if (field.type === 'number') {
    const num = Number(value)
    if (Number.isNaN(num)) return `${name} must be a number.`
    if (rules.integer && !Number.isInteger(num)) return `${name} must be a whole number.`
    if (rules.min !== undefined && num < rules.min) return `${name} must be ${rules.min} or more.`
    if (rules.max !== undefined && num > rules.max) return `${name} must be ${rules.max} or less.`
  }

  if (rules.notPast && value < todayISO()) return 'Please choose today or a future date.'

  return ''
}

export function validateFields(fields, values) {
  return Object.fromEntries(
    fields.map((f) => [f.name, validateField(f, values[f.name])]).filter(([, err]) => err),
  )
}
