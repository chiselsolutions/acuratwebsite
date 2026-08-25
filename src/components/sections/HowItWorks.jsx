import { STEPS } from '../../data/site'
import { Container } from '../ui/Container'
import { Section, SectionHeader } from '../ui/Section'

export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <SectionHeader
          tag="How It Works"
          tagClass="text-navy"
          heading="Four steps, upload to sign-off"
        />

        <ol className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.num} className="text-center">
              <div
                className={`mb-3 font-mono text-4xl leading-none font-semibold lg:text-[44px] ${step.numClass}`}
              >
                {step.num}
              </div>
              <h3 className="mb-1.5 text-base font-bold text-ink">{step.title}</h3>
              <p className="text-sm leading-[1.55] text-ink-tertiary">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
