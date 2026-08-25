import { useDemoModal } from '../../context/DemoModalContext'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function CallToAction() {
  const { open: openDemoModal } = useDemoModal()

  return (
    <section
      id="cta"
      className="bg-[linear-gradient(160deg,var(--color-dark)_0%,#0d2b1f_60%,var(--color-green)_100%)] py-16 text-center text-white sm:py-20 lg:py-25"
    >
      <Container narrow>
        <h2 className="mb-4 text-[26px] font-extrabold tracking-[-0.5px] sm:text-[32px] lg:text-[40px]">
          Ready to see agentic AI review in action?
        </h2>
        <p className="mx-auto mb-9 max-w-[440px] text-[15px] leading-[1.65] text-white/60 sm:text-[17px]">
          Talk to our team and see how Acurat fits into your firm&apos;s review
          workflow.
        </p>
        <Button href="#request-demo" onClick={openDemoModal} variant="white">
          Schedule a Demo &rarr;
        </Button>
      </Container>
    </section>
  )
}
