import { FEATURES } from '../../data/site'
import { Container } from '../ui/Container'
import { IconTile } from '../ui/IconTile'
import { Section, SectionHeader } from '../ui/Section'

export function Features() {
  return (
    <Section id="features">
      <Container>
        <SectionHeader
          tag="Platform"
          tagClass="text-green"
          heading="AI that reviews like your best reviewer — at scale"
          description="Upload returns, let agents run, review findings, and sign off — all in one place."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-green hover:shadow-[0_4px_20px_rgba(27,122,94,0.06)]"
            >
              <IconTile
                icon={feature.icon}
                className={`${feature.iconClass} mb-4.5`}
              />
              <h3 className="mb-2 text-[17px] font-bold text-ink">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-ink-tertiary">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
