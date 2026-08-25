import { ABOUT_PARAGRAPHS, ABOUT_VALUES } from '../../data/site'
import { Container } from '../ui/Container'
import { Section, SectionTag } from '../ui/Section'

export function About() {
  return (
    <Section id="about" className="bg-white">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionTag className="text-purple">About Acurat</SectionTag>
            <h2 className="mb-5 text-[26px] leading-[1.2] font-extrabold tracking-[-0.5px] text-dark sm:text-[32px] lg:text-4xl">
              We believe tax review deserves{' '}
              <span className="text-green">better tools</span>
            </h2>
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mb-4 text-[15px] leading-[1.75] text-ink-secondary sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ABOUT_VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-white px-5 py-4.5"
              >
                <h3 className={`mb-1 text-sm font-bold ${value.titleClass}`}>
                  {value.title}
                </h3>
                <p className="text-xs leading-[1.5] text-ink-tertiary">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
