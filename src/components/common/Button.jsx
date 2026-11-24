import { Link } from 'react-router-dom'

/**
 * Polymorphic button: renders a router <Link> for `to`, an <a> for `href`,
 * otherwise a <button>.
 * variants: primary | secondary | outline | light | ghost
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  icon: Icon,
  iconPosition = 'end',
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon && iconPosition === 'start' && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'end' && <Icon size={18} aria-hidden="true" />}
    </>
  )

  // Links set from the admin panel may be external (https:, mailto:, tel:).
  if (to && /^(https?:|mailto:|tel:)/i.test(to)) {
    href = to
    to = undefined
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
