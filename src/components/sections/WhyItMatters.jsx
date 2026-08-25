import { IMPACTS } from '../../data/site'
import { Container } from '../ui/Container'
import { IconTile } from '../ui/IconTile'
import { Section, SectionHeading } from '../ui/Section'

export function WhyItMatters() {
  return (
    <Section className="bg-light">
      <Container>
        <div className="mb-12 text-center sm:mb-14">
          <SectionHeading className="mx-auto max-w-[600px]">
            The{' '}
            <span className="relative inline-block text-green">
              impact
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-sm bg-green opacity-30"
              />
            </span>{' '}
            on your practice
          </SectionHeading>
        </div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2">
          {IMPACTS.map((impact) => (
            <article
              key={impact.title}
              className="rounded-[14px] border border-border bg-white px-7 py-7.5"
            >
              <IconTile
                icon={impact.icon}
                size="md"
                className={`${impact.iconClass} mb-4`}
              />
              <h3 className="mb-1.5 text-base font-extrabold text-dark">
                {impact.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-ink-secondary">
                {impact.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
