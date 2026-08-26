import { ENDPOINTS } from './endpoints'

/**
 * Form field ⇄ API field. Declared once and used in both directions: building
 * the multipart body, and mapping server-side field errors back onto the form.
 */
const FIELD_MAP = {
  firstName: 'first_name',
  lastName: 'last_name',
  email: 'work_email',
  firmName: 'firm_name',
  taxSoftware: 'tax_software',
  pms: 'practice_management_system',
  returnVolume: 'annual_return_volume',
  phone: 'phone_number',
  smsOptIn: 'sms_opt_in',
}

const API_TO_FORM = Object.fromEntries(
  Object.entries(FIELD_MAP).map(([form, api]) => [api, form]),
)

const GENERIC_ERROR = 'Something went wrong. Please try again.'
const NETWORK_ERROR = 'Network error. Please check your connection and try again.'

/** Envelope is `{ error, data, message }` — tolerate a non-JSON body too. */
async function readEnvelope(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

/**
 * Loads the dropdown options for the demo form.
 *
 * Returns option lists already in the `{ value, label }` shape the Select
 * component expects — `value` is the slug the POST endpoint requires
 * (`"drake"`), `label` is what the visitor sees (`"Drake"`).
 *
 * @returns {Promise<{ ok: true, choices: object } | { ok: false, error: string }>}
 */
export async function fetchDemoChoices({ signal } = {}) {
  try {
    const response = await fetch(ENDPOINTS.demoRequest.choices, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    })

    const body = await readEnvelope(response)

    if (!response.ok || !body || body.error) {
      return { ok: false, error: body?.message || GENERIC_ERROR }
    }

    const data = body.data ?? {}
    return {
      ok: true,
      choices: {
        taxSoftware: data.tax_software ?? [],
        pms: data.practice_management_system ?? [],
        returnVolume: data.annual_return_volume ?? [],
      },
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error
    return { ok: false, error: NETWORK_ERROR }
  }
}

/**
 * Submits the demo request as multipart/form-data.
 *
 * `Content-Type` is deliberately not set — the browser has to add it itself so
 * it can append the multipart boundary.
 *
 * @returns {Promise<{ ok: true } | { ok: false, error: string, fieldErrors?: object }>}
 */
export async function submitDemoRequest(values) {
  const body = new FormData()

  /** Optional fields are left out entirely rather than sent as empty strings. */
  const appendIfPresent = (field, value) => {
    const trimmed = (value ?? '').trim()
    if (trimmed) body.append(field, trimmed)
  }

  // Required.
  body.append(FIELD_MAP.firstName, values.firstName.trim())
  body.append(FIELD_MAP.email, values.email.trim())
  body.append(FIELD_MAP.smsOptIn, values.smsOptIn ? 'true' : 'false')

  // Optional.
  appendIfPresent(FIELD_MAP.lastName, values.lastName)
  appendIfPresent(FIELD_MAP.firmName, values.firmName)
  appendIfPresent(FIELD_MAP.taxSoftware, values.taxSoftware)
  appendIfPresent(FIELD_MAP.pms, values.pms)
  appendIfPresent(FIELD_MAP.returnVolume, values.returnVolume)
  appendIfPresent(FIELD_MAP.phone, values.phone)

  try {
    const response = await fetch(ENDPOINTS.demoRequest.create, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    })

    const envelope = await readEnvelope(response)

    if (response.ok && envelope && !envelope.error) return { ok: true }

    return {
      ok: false,
      error: envelope?.message || GENERIC_ERROR,
      fieldErrors: toFieldErrors(envelope?.data ?? envelope?.errors),
    }
  } catch {
    return { ok: false, error: NETWORK_ERROR }
  }
}

/**
 * Turns `{ work_email: ["Already registered."] }` into
 * `{ email: "Already registered." }` so errors land on the right input.
 */
function toFieldErrors(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return undefined

  const errors = {}
  for (const [apiField, detail] of Object.entries(data)) {
    const formField = API_TO_FORM[apiField]
    if (!formField) continue
    errors[formField] = Array.isArray(detail) ? detail[0] : String(detail)
  }

  return Object.keys(errors).length > 0 ? errors : undefined
}
