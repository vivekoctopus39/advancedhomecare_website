import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CircleAlert, LoaderCircle, Send } from 'lucide-react'
import FormField from './FormField'
import SubmissionResult from './SubmissionResult'
import { bookingSteps } from '../../data/enquiryFields'
import { useContent, useEnquiryFields, useSection } from '../../hooks/useContent'
import { useEnquiryForm } from '../../hooks/useEnquiryForm'
import { submitBookingEnquiry } from '../../services/enquiryService'
import DynamicIcon from '../common/DynamicIcon'

/** Visual radio-card picker used for service and duration selection. */
function ChoiceGrid({ name, label, options, value, error, onSelect, columns = 'auto' }) {
  const errorId = `field-${name}-error`
  return (
    <fieldset className={`choice-group${error ? ' has-error' : ''}`} aria-describedby={error ? errorId : undefined}>
      <legend className="form-label">
        {label}
        <span className="form-required" aria-hidden="true">
          *
        </span>
      </legend>
      <div className={`choice-grid choice-grid--${columns}`}>
        {options.map((opt, index) => {
          const checked = value === opt.value
          return (
            <label key={opt.value} className={`choice-card${checked ? ' is-checked' : ''}`}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onSelect(name, opt.value)}
                id={index === 0 ? `field-${name}` : undefined}
              />
              <span className="choice-card__icon" aria-hidden="true">
                <DynamicIcon name={opt.icon} size={20} />
              </span>
              <span className="choice-card__text">
                <span className="choice-card__label">{opt.label}</span>
                {opt.hint && <span className="choice-card__hint">{opt.hint}</span>}
              </span>
              <span className="choice-card__check" aria-hidden="true">
                <Check size={14} />
              </span>
            </label>
          )
        })}
      </div>
      {error && (
        <p id={errorId} className="form-error">
          <CircleAlert size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  )
}

const WIDE_FIELDS = new Set(['address', 'requirements', 'patientCondition'])

const labelFor = (name, value, services, careDurations) => {
  if (!value) return '—'
  if (name === 'service') return services.find((s) => s.slug === value)?.title || value
  if (name === 'careDuration') return careDurations.find((d) => d.value === value)?.label || value
  if (name === 'startDate') {
    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
  }
  return value
}

export default function BookingWizard({ initialService = '' }) {
  const [step, setStep] = useState(0)
  const topRef = useRef(null)
  const { services = [], careDurations = [] } = useContent()
  const enquiryFields = useEnquiryFields()
  const summary = useSection('book.summary')
  const serviceChoices = services.map((s) => ({ value: s.slug, label: s.title, icon: s.icon }))
  const durationChoices = careDurations.map((d) => ({ value: d.value, label: d.label, hint: d.text, icon: d.icon }))
  const form = useEnquiryForm({
    initialValues: { service: initialService },
    onSubmit: submitBookingEnquiry,
  })
  const { values, errors, status, result, submitError, handleChange, handleBlur, setFieldValue, validate, submit, reset } =
    form

  const current = bookingSteps[step]
  const isLast = step === bookingSteps.length - 1

  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const goNext = () => {
    if (!validate(current.fields)) return
    setStep((s) => s + 1)
    scrollToTop()
  }
  const goBack = () => {
    setStep((s) => Math.max(0, s - 1))
    scrollToTop()
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!isLast) {
      goNext()
      return
    }
    const allFields = bookingSteps.flatMap((s) => s.fields)
    // Validate every step; jump back to the first step that has an error.
    const firstBad = bookingSteps.findIndex((s) => !validate(s.fields))
    if (firstBad !== -1) {
      setStep(firstBad)
      return
    }
    await submit(allFields)
  }

  const handleReset = () => {
    reset()
    setStep(0)
  }

  if (status === 'success') {
    return (
      <div className="booking-layout booking-layout--done" ref={topRef}>
        <div className="form-card">
          <SubmissionResult result={result} onReset={handleReset} resetLabel="Start a new enquiry" />
        </div>
      </div>
    )
  }

  return (
    <div className="booking-layout" ref={topRef}>
      <form className="form-card booking-form" onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'}>
        <ol className="stepper" aria-label="Enquiry progress">
          {bookingSteps.map((s, i) => (
            <li
              key={s.id}
              className={`stepper__item${i === step ? ' is-current' : ''}${i < step ? ' is-done' : ''}`}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="stepper__dot">{i < step ? <Check size={14} aria-hidden="true" /> : i + 1}</span>
              <span className="stepper__label">{s.title}</span>
            </li>
          ))}
        </ol>

        <div className="booking-form__head">
          <p className="booking-form__count">
            Step {step + 1} of {bookingSteps.length}
          </p>
          <h2>{current.heading}</h2>
          <p>{current.description}</p>
        </div>

        <div className="booking-form__body" key={current.id}>
          {current.id === 'service' ? (
            <>
              <ChoiceGrid
                name="service"
                label="Required Service"
                options={serviceChoices}
                value={values.service}
                error={errors.service}
                onSelect={setFieldValue}
              />
              <ChoiceGrid
                name="careDuration"
                label="Preferred Care Duration"
                options={durationChoices}
                value={values.careDuration}
                error={errors.careDuration}
                onSelect={setFieldValue}
                columns="wide"
              />
            </>
          ) : (
            <div className="form-grid">
              {current.fields.map((name) => (
                <FormField
                  key={name}
                  field={enquiryFields[name]}
                  value={values[name]}
                  error={errors[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={WIDE_FIELDS.has(name) ? 'form-field--wide' : ''}
                />
              ))}
            </div>
          )}
        </div>

        {status === 'error' && (
          <p className="notice notice--error" role="alert">
            <CircleAlert size={16} aria-hidden="true" />
            <span>{submitError}</span>
          </p>
        )}

        <div className="booking-form__nav">
          {step > 0 ? (
            <button type="button" className="btn btn--ghost btn--md" onClick={goBack}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Back</span>
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <LoaderCircle size={18} className="spin" aria-hidden="true" />
                <span>Submitting…</span>
              </>
            ) : isLast ? (
              <>
                <span>Submit Enquiry</span>
                <Send size={18} aria-hidden="true" />
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>

      <aside className="booking-summary" aria-label="Enquiry summary">
        <h3>{summary.title || 'Your Enquiry'}</h3>
        <dl>
          {[
            ['service', 'Service'],
            ['careDuration', 'Duration'],
            ['patientName', 'Patient'],
            ['patientAge', 'Age'],
            ['startDate', 'Start date'],
            ['city', 'City'],
          ].map(([name, label]) => (
            <div key={name}>
              <dt>{label}</dt>
              <dd className={values[name] ? '' : 'is-empty'}>{labelFor(name, values[name], services, careDurations)}</dd>
            </div>
          ))}
        </dl>
        {summary.body && <p className="booking-summary__note">{summary.body}</p>}
      </aside>
    </div>
  )
}
