import { HERO_SEGMENTS } from '../../data/site'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useDemoModal } from '../../context/DemoModalContext'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

export function Hero() {
  const { open: openDemoModal } = useDemoModal()
  const { visible, isDone } = useTypewriter(HERO_SEGMENTS)

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-linear-to-b from-green-faint to-white px-0 pt-32 pb-16 text-center sm:pt-36 sm:pb-20 lg:pt-38 lg:pb-25"
    >
      {/* Soft radial glow behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,122,94,0.04)_0%,transparent_70%)]"
      />

      <Container narrow className="relative">
        <div className="mb-7 inline-flex animate-[fadeDown_0.6s_ease_forwards] items-center gap-2 rounded-full border border-green/12 bg-green-faint px-4 py-1.5 text-[13px] font-bold tracking-[0.2px] text-green">
          <span className="h-1.5 w-1.5 animate-[pulseDot_2s_ease_infinite] rounded-full bg-green" />
          Agentic AI for Tax
        </div>

        <h1 className="mx-auto mb-6 min-h-[104px] max-w-[680px] text-[26px] leading-[1.12] font-extrabold tracking-[-1px] text-dark sm:min-h-[110px] sm:text-[38px] lg:min-h-[130px] lg:text-[52px] lg:tracking-[-1.5px]">
          {visible.map((segment, index) => (
            <span key={index} className={cn(segment.accent && 'text-green')}>
              {segment.text}
            </span>
          ))}
          {!isDone && (
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-6 w-[3px] animate-[blink_0.8s_step-end_infinite] bg-green align-text-bottom sm:h-9 lg:h-12"
            />
          )}
        </h1>

        <p className="mx-auto mb-10 max-w-[520px] animate-[fadeUp_0.6s_ease_2.8s_forwards] text-[15px] leading-[1.65] font-medium text-ink-secondary opacity-0 sm:text-[17px] lg:text-[19px]">
          AI agents perform the first-pass review across every 1040, so your team can
          handle more returns with less burnout.
        </p>

        <div className="flex animate-[fadeUp_0.6s_ease_3s_forwards] flex-col items-center justify-center gap-3.5 opacity-0 sm:flex-row">
          <Button
            href="#request-demo"
            onClick={openDemoModal}
            variant="primary"
            className="w-full sm:w-auto"
          >
            Request a Demo &rarr;
          </Button>
          <Button href="#how" variant="ghost" className="w-full sm:w-auto">
            See How It Works
          </Button>
        </div>
      </Container>
    </section>
  )
}
