import { useEffect, useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useDemoModal } from '../../context/DemoModalContext'
import { useDemoChoices } from '../../hooks/useDemoChoices'
import { submitDemoRequest } from '../../api'
import { AlertIcon, ArrowRightIcon, CheckIcon } from '../icons'
import { Modal } from '../ui/Modal'
import { TextField } from '../ui/Field'
import { Select } from '../ui/Select'
import { PhoneField } from '../ui/PhoneField'
import { Checkbox } from '../ui/Checkbox'

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  firmName: '',
  taxSoftware: '',
  pms: '',
  returnVolume: '',
  country: 'US',
  phone: '',
  smsOptIn: false,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Free-mail domains are rejected because the field asks for a *work* email. */
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
]

function validate(values) {
  const errors = {}

  if (!values.firstName.trim()) errors.firstName = 'First name is required.'
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.'

  const email = values.email.trim()
  if (!email) {
    errors.email = 'Work email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  } else if (PERSONAL_EMAIL_DOMAINS.includes(email.split('@')[1]?.toLowerCase())) {
    errors.email = 'Please use your work email address.'
  }

  if (!values.firmName.trim()) errors.firmName = 'Firm name is required.'
  if (!values.taxSoftware) errors.taxSoftware = 'Please select your tax software.'
  if (!values.returnVolume) errors.returnVolume = 'Please select a range.'

  // libphonenumber-js checks the number against that country's real numbering
  // plan — length, prefix and all — rather than a naive digit count.
  if (!values.phone) {
    errors.phone = 'Phone number is required.'
  } else if (!isValidPhoneNumber(values.phone)) {
    errors.phone = 'Please enter a valid phone number for the selected country.'
  }

  return errors
}

export function RequestDemoModal() {
  const { isOpen, close } = useDemoModal()

  // Dropdown options come from the API; fetched the first time the modal opens
  // and cached from then on.
  const {
    choices,
    isLoading: isLoadingChoices,
    error: choicesError,
    retry: retryChoices,
  } = useDemoChoices(isOpen)

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Every open starts from a clean slate, matching the original behaviour.
  useEffect(() => {
    if (!isOpen) return
    setValues(INITIAL_VALUES)
    setErrors({})
    setSubmitError('')
    setIsSubmitting(false)
    setIsSubmitted(false)
  }, [isOpen])

  /** Sets one field and clears its error as soon as it is edited. */
  const setValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }

  /** For native inputs, which hand back an event. */
  const setField = (name) => (event) =>
    setValue(
      name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    )

  /** For the custom Select / PhoneField, which hand back the value itself. */
  const setDirect = (name) => (value) => setValue(name, value)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError('Please fix the highlighted fields and try again.')
      return
    }

    setSubmitError('')
    setIsSubmitting(true)
    const result = await submitDemoRequest(values)

    setIsSubmitting(false)
    if (result.ok) {
      setIsSubmitted(true)
      return
    }

    setSubmitError(result.error)
    // Server-side validation (duplicate email, rejected slug, …) lands on the
    // matching input rather than only in the banner.
    if (result.fieldErrors) setErrors(result.fieldErrors)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      labelledBy="request-demo-title"
      className="max-w-[560px] md:max-w-[680px]"
    >
      {isSubmitted ? (
        <SuccessPanel onClose={close} />
      ) : (
        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-9">
          <header className="mb-6 pr-8">
            <h2
              id="request-demo-title"
              className="text-[22px] font-extrabold tracking-[-0.4px] text-dark sm:text-[26px]"
            >
              Request a Demo
            </h2>
            <p className="mt-1.5 text-sm text-ink-secondary sm:text-[15px]">
              See how Acurat can transform your firm&apos;s review process.
            </p>
          </header>

          {submitError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-[10px] border border-danger/20 bg-danger/5 px-4 py-3 text-[13px] font-semibold text-danger"
            >
              <AlertIcon size={16} className="mt-px shrink-0" />
              {submitError}
            </div>
          )}

          {/* The dropdowns are unusable without their options, so surface a
              retry rather than leaving three empty selects. */}
          {choicesError && (
            <div
              role="alert"
              className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[10px] border border-gold/25 bg-gold-faint px-4 py-3 text-[13px] font-semibold text-gold"
            >
              <AlertIcon size={16} className="shrink-0" />
              <span className="flex-1">Couldn&apos;t load the dropdown options.</span>
              <button
                type="button"
                onClick={retryChoices}
                className="cursor-pointer rounded-md border border-gold/40 px-2.5 py-1 text-[12px] font-bold text-gold transition-colors hover:bg-gold/10"
              >
                Retry
              </button>
            </div>
          )}

          {/* Two-column qualification grid, stacking on mobile */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <TextField
              label="First name"
              required
              autoComplete="given-name"
              placeholder="Jane"
              value={values.firstName}
              onChange={setField('firstName')}
              error={errors.firstName}
            />
            <TextField
              label="Last name"
              required
              autoComplete="family-name"
              placeholder="Smith"
              value={values.lastName}
              onChange={setField('lastName')}
              error={errors.lastName}
            />
            <TextField
              label="Work email"
              required
              type="email"
              autoComplete="email"
              placeholder="you@firm.com"
              value={values.email}
              onChange={setField('email')}
              error={errors.email}
            />
            <TextField
              label="Firm name"
              required
              autoComplete="organization"
              placeholder="Your firm"
              value={values.firmName}
              onChange={setField('firmName')}
              error={errors.firmName}
            />
            <Select
              label="Tax software used"
              required
              placeholder="Select your tax software"
              options={choices?.taxSoftware ?? []}
              isLoading={isLoadingChoices}
              value={values.taxSoftware}
              onChange={setDirect('taxSoftware')}
              error={errors.taxSoftware}
            />
            <Select
              label="Practice management system"
              placeholder="Select your PMS"
              options={choices?.pms ?? []}
              isLoading={isLoadingChoices}
              value={values.pms}
              onChange={setDirect('pms')}
              error={errors.pms}
            />
            <Select
              label="Annual return volume"
              required
              hint="Roughly how many returns your firm files each season. It helps us tailor the demo."
              placeholder="Select a range"
              options={choices?.returnVolume ?? []}
              isLoading={isLoadingChoices}
              value={values.returnVolume}
              onChange={setDirect('returnVolume')}
              error={errors.returnVolume}
            />
            <PhoneField
              required
              country={values.country}
              onCountryChange={setDirect('country')}
              value={values.phone}
              onChange={setDirect('phone')}
              error={errors.phone}
            />
          </div>

          <Checkbox
            className="mt-6"
            label="Text me a demo confirmation and reminders"
            checked={values.smsOptIn}
            onChange={setField('smsOptIn')}
          />

          <p className="mt-3 text-[12px] leading-[1.6] text-ink-tertiary">
            By opting in, you agree to receive Marketing and Customer Care SMS
            messages from Acurat. Message frequency varies. Message &amp; data rates
            may apply. Reply <strong className="font-bold text-ink-secondary">HELP</strong>{' '}
            for help or <strong className="font-bold text-ink-secondary">STOP</strong>{' '}
            to cancel. See our{' '}
            <a
              href="#privacy"
              className="font-semibold text-green underline underline-offset-2 hover:text-green-hover"
            >
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            disabled={isSubmitting || isLoadingChoices}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border-none bg-[#1a1a1a] px-6 py-3.5 text-[15px] font-bold text-white transition-all duration-150 hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:cursor-not-allowed disabled:bg-border disabled:text-ink-tertiary"
          >
            {isSubmitting ? 'Submitting…' : 'Request a demo'}
            {!isSubmitting && <ArrowRightIcon size={17} />}
          </button>
        </form>
      )}
    </Modal>
  )
}

function SuccessPanel({ onClose }) {
  return (
    <div className="px-6 py-14 text-center sm:px-9">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-light text-green">
        <CheckIcon size={26} />
      </div>
      <h3
        id="request-demo-title"
        className="mb-1.5 text-xl font-bold text-dark sm:text-[22px]"
      >
        Thank you!
      </h3>
      <p className="mx-auto max-w-[340px] text-sm text-ink-secondary sm:text-[15px]">
        Our team will get in touch with you very shortly.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 cursor-pointer rounded-[10px] border-[1.5px] border-border bg-transparent px-7 py-2.5 text-sm font-bold text-ink transition-colors hover:border-green hover:text-green"
      >
        Close
      </button>
    </div>
  )
}
