/**
 * Every API URL the app talks to, in one place.
 *
 * Nothing else belongs in this file — no fetch calls, no payload shaping. Point
 * `VITE_API_BASE_URL` at staging/production and every endpoint below follows.
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://dev-core.acurat.ai'
).replace(/\/$/, '')

/** Joins a path onto the base URL, tolerating a leading slash or not. */
const url = (path) => `${API_BASE_URL}/${path.replace(/^\//, '')}`

export const ENDPOINTS = {
  demoRequest: {
    /** GET — dropdown options for the demo form. */
    choices: url('/api/contact/demo-requests/choices/'),
    /** POST — submit a demo request (multipart/form-data). */
    create: url('/api/contact/demo-requests/'),
  },
}
