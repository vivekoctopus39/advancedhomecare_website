import { CircleAlert, LoaderCircle, Send } from 'lucide-react'
import FormField from './FormField'
import SubmissionResult from './SubmissionResult'
import { contactFormFields } from '../../data/enquiryFields'
import { useEnquiryFields } from '../../hooks/useContent'
import { useEnquiryForm } from '../../hooks/useEnquiryForm'
import { submitEnquiry } from '../../services/enquiryService'

const WIDE_FIELDS = new Set(['address', 'requirements'])

/** Single-page enquiry form used on the homepage and Contact page. */
export default function EnquiryForm({ title = 'Send an Enquiry', intro }) {
  const enquiryFields = useEnquiryFields()
  const form = useEnquiryForm({ onSubmit: submitEnquiry })
  const { values, errors, status, result, submitError, handleChange, handleBlur, submit, reset } = form

  if (status === 'success') {
    return (
      <div className="form-card">
        <SubmissionResult result={result} onReset={reset} />
      </div>
    )
  }

  const onSubmit = (event) => {
    event.preventDefault()
    submit(contactFormFields)
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'}>
      <div className="form-card__header">
        <h3>{title}</h3>
        {intro && <p>{intro}</p>}
      </div>

      <div className="form-grid">
        {contactFormFields.map((name) => (
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

      {status === 'error' && (
        <p className="notice notice--error" role="alert">
          <CircleAlert size={16} aria-hidden="true" />
          <span>{submitError}</span>
        </p>
      )}

      <div className="form-card__footer">
        <p className="form-hint">
          Fields marked <span className="form-required">*</span> are required. We use your details only to respond
          to this enquiry.
        </p>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <LoaderCircle size={18} className="spin" aria-hidden="true" />
              <span>Submitting…</span>
            </>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <Send size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
