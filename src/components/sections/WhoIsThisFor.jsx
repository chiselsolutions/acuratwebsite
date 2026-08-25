import { AUDIENCES } from '../../data/site'
import { Container } from '../ui/Container'
import { IconTile } from '../ui/IconTile'
import { Section, SectionHeader } from '../ui/Section'

export function WhoIsThisFor() {
  return (
    <Section id="who">
      <Container>
        <SectionHeader
          tag="Who Is This For?"
          tagClass="text-teal"
          heading="Built for firms that want to do more with the team they have"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience) => (
            <article
              key={audience.title}
              className="rounded-[14px] border border-border bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <IconTile
                icon={audience.icon}
                size="lg"
                className={`${audience.iconClass} mx-auto mb-4`}
              />
              <h3 className="mb-2 text-[15px] font-bold text-dark">
                {audience.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-ink-secondary">
                {audience.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
