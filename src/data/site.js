import {
  ChartIcon,
  ClipboardCheckIcon,
  ClockIcon,
  DocumentCheckIcon,
  GearIcon,
  GlobeIcon,
  PencilIcon,
  ShieldCheckIcon,
  ShieldIcon,
  TeamIcon,
  TrendUpIcon,
  UserIcon,
} from '../components/icons'

/** Primary navigation links. */
export const NAV_LINKS = [
  { label: 'Platform', href: '#features' },
  { label: 'Products', href: '#products' },
  { label: 'How It Works', href: '#how' },
  { label: 'About', href: '#about' },
]

export const FOOTER_LINKS = [
  { label: 'Platform', href: '#features' },
  { label: 'Product', href: '#products' },
  { label: 'How It Works', href: '#how' },
  { label: 'About', href: '#about' },
]

/**
 * Hero headline, typed out one segment at a time.
 * `accent` segments render in brand green and type slightly slower.
 */
export const HERO_SEGMENTS = [
  { text: 'Never ', accent: false },
  { text: 'miss', accent: true },
  { text: ' a carryover, credit, or inconsistency again', accent: false },
]

export const FEATURES = [
  {
    icon: DocumentCheckIcon,
    title: 'Agent-Powered Review',
    body: 'AI agents analyze returns grounded in IRS publications with confidence scores.',
    iconClass: 'bg-green-faint text-green',
  },
  {
    icon: ChartIcon,
    title: 'Year-over-Year Comparison',
    body: 'Side-by-side comparison with smart filters to spot income swings and missing forms.',
    iconClass: 'bg-navy-light text-navy',
  },
  {
    icon: PencilIcon,
    title: 'Configurable Skills',
    body: "40+ review skills you can toggle to match your firm's practice areas.",
    iconClass: 'bg-gold-light text-gold',
  },
  {
    icon: TeamIcon,
    title: 'Team Dashboard',
    body: 'Track your pipeline, assign returns, and monitor resolution rates.',
    iconClass: 'bg-purple-light text-purple',
  },
  {
    icon: GearIcon,
    title: 'Human-in-the-Loop',
    body: 'Confidence scoring auto-approves the clear ones, escalates the rest to your team.',
    iconClass: 'bg-teal-light text-teal',
  },
  {
    icon: ShieldIcon,
    title: 'Audit Trail & Sign-Off',
    body: 'Full audit log with electronic sign-off. Export to PDF, Excel, or CSV.',
    iconClass: 'bg-gold-faint text-gold',
  },
]

export const AUDIENCES = [
  {
    icon: UserIcon,
    title: 'Firms wanting to scale',
    body: 'Handle more returns without hiring additional reviewers.',
    iconClass: 'bg-green-faint text-green',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Firms wanting consistency',
    body: "Every return reviewed with the same rigor, regardless of who's assigned.",
    iconClass: 'bg-navy-light text-navy',
  },
  {
    icon: ChartIcon,
    title: 'Firms wanting to reduce workload',
    body: 'Let AI handle the first pass so your reviewers focus on judgment calls.',
    iconClass: 'bg-gold-light text-gold',
  },
  {
    icon: GlobeIcon,
    title: 'Firms with offshore teams',
    body: 'Standardize review quality across all locations and time zones.',
    iconClass: 'bg-purple-light text-purple',
  },
]

export const IMPACTS = [
  {
    icon: TrendUpIcon,
    title: 'Reduced review time',
    body: 'AI handles the first pass so your team focuses on what needs judgment.',
    iconClass: 'bg-green-faint text-green',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Fewer errors',
    body: 'Every line checked against IRS rules, carryovers, and prior year — nothing slips through.',
    iconClass: 'bg-navy-light text-navy',
  },
  {
    icon: ClockIcon,
    title: 'More advisory hours',
    body: 'Time saved on compliance becomes time spent on higher-value advisory work.',
    iconClass: 'bg-gold-light text-gold',
  },
  {
    icon: TeamIcon,
    title: 'Less staff burnout',
    body: 'Your team handles more returns without the late nights and manual line-checking.',
    iconClass: 'bg-purple-light text-purple',
  },
]

export const STEPS = [
  {
    num: '01',
    title: 'Upload',
    body: 'Drop your tax documents. Acurat detects form types and tax year automatically.',
    numClass: 'text-green-light',
  },
  {
    num: '02',
    title: 'Agents Run',
    body: 'Agents execute in a multi-pass pipeline. Findings appear in real-time with dollar impact.',
    numClass: 'text-navy-light',
  },
  {
    num: '03',
    title: 'Review',
    body: 'Your reviewers review escalated items, add notes, and resolve findings that need judgment.',
    numClass: 'text-gold-light',
  },
  {
    num: '04',
    title: 'Sign Off',
    body: 'Complete the checklist and export the full review.',
    numClass: 'text-purple-light',
  },
]

export const PRODUCT = {
  title: '1040 Review',
  body: 'AI agents review every line of the 1040 — income, deductions, credits, and multi-state allocations. Each finding comes with source citations, prior-year comparison, and a confidence score so your reviewers know exactly where to focus.',
  badges: [
    { label: 'Agentic AI Review', className: 'bg-green-light text-green' },
    { label: 'Prior Year Comparison', className: 'bg-navy-light text-navy' },
    { label: 'Configurable Skills', className: 'bg-gold-light text-gold' },
    { label: 'Source Citations', className: 'bg-purple-light text-purple' },
  ],
}

export const ABOUT_PARAGRAPHS = [
  'CPA firms spend thousands of hours every season on manual review — checking the same lines, catching the same errors, chasing the same carryovers. We started Acurat because we believe agentic AI can fundamentally change how returns are reviewed — not by replacing reviewers, but by giving them an intelligent first pass they can trust.',
  "Our platform is built by a team that understands both tax and AI deeply. Every finding is grounded in IRS publications and traceable to a source. 1040 review is just the beginning — we're expanding to support other entity types as well.",
]

export const ABOUT_VALUES = [
  {
    title: 'Accuracy First',
    body: 'Every finding backed by IRS publications and traceable to source.',
    titleClass: 'text-green',
  },
  {
    title: 'Reviewer in Control',
    body: 'AI handles volume. Your team handles judgment. Confidence scoring keeps humans in the loop.',
    titleClass: 'text-navy',
  },
  {
    title: 'Domain Expertise',
    body: 'Each agent is a specialist. From mortgage interest to passive activity rules.',
    titleClass: 'text-gold',
  },
  {
    title: 'Your Practice, Your Rules',
    body: "40+ configurable skills. Enable what your firm needs, disable what it doesn't.",
    titleClass: 'text-purple',
  },
]

export const COMPANY = {
  name: 'Acurat',
  tagline: 'Agentic AI for tax return review.',
  copyright: '© 2026 Acurat, Inc. All rights reserved. Delaware Corporation.',
  strapline: 'Built for firms that demand accuracy.',
}
