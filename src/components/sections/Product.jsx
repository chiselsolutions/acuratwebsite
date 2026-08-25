import { PRODUCT } from '../../data/site'
import { ClipboardCheckIcon } from '../icons'
import { Container } from '../ui/Container'
import { IconTile } from '../ui/IconTile'
import { Section, SectionHeader } from '../ui/Section'

export function Product() {
  return (
    <Section id="products" className="bg-light">
      <Container>
        <SectionHeader
          tag="Product"
          tagClass="text-green"
          heading="Agentic AI review for 1040 returns"
        />

        <article className="mx-auto flex max-w-[720px] flex-col items-center gap-8 rounded-[20px] border-2 border-green bg-white px-6 py-8 text-center sm:px-10 sm:py-11 md:flex-row md:gap-9 md:text-left">
          <IconTile
            icon={ClipboardCheckIcon}
            size="xl"
            className="bg-green-light text-green"
          />

          <div>
            <h3 className="mb-2.5 text-[22px] font-extrabold text-dark sm:text-2xl">
              {PRODUCT.title}
            </h3>
            <p className="mb-4.5 text-[15px] leading-[1.7] text-ink-secondary">
              {PRODUCT.body}
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {PRODUCT.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-block rounded-md px-3.5 py-1 text-[11px] font-bold ${badge.className}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </Section>
  )
}
