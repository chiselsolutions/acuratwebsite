import { COMPANY, FOOTER_LINKS } from '../../data/site'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="bg-dark pt-12 pb-8 text-white/40">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-0">
          <div>
            <Logo tone="light" />
            <p className="mt-2 max-w-[240px] text-[13px] leading-[1.65]">
              {COMPANY.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 md:gap-9">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 no-underline transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/8 pt-6 text-xs sm:flex-row sm:justify-between">
          <span>{COMPANY.copyright}</span>
          <span>{COMPANY.strapline}</span>
        </div>
      </Container>
    </footer>
  )
}
