import { useState } from 'react'
import { NAV_LINKS } from '../../data/site'
import { useDemoModal } from '../../context/DemoModalContext'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { Logo } from '../ui/Logo'
import { cn } from '../../lib/cn'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { open: openDemoModal } = useDemoModal()

  useLockBodyScroll(isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  const handleDemoClick = (event) => {
    closeMenu()
    openDemoModal(event)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-100 border-b border-green/8 bg-white/85 backdrop-blur-[16px]">
      <div className="mx-auto flex h-15 max-w-[1100px] items-center justify-between px-5 sm:px-7">
        <a href="#top" className="no-underline" onClick={closeMenu}>
          <Logo />
        </a>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="z-110 flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1 md:hidden"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'block h-0.5 w-[22px] rounded-sm bg-ink transition-all duration-300',
                isMenuOpen && i === 0 && 'translate-y-[7px] rotate-45',
                isMenuOpen && i === 1 && 'opacity-0',
                isMenuOpen && i === 2 && '-translate-y-[7px] -rotate-45',
              )}
            />
          ))}
        </button>

        {/* Links — inline on desktop, full-screen overlay on mobile */}
        <ul
          className={cn(
            'list-none',
            // mobile overlay
            'fixed inset-0 z-105 flex h-dvh w-full flex-col items-center justify-center gap-7 bg-white transition-opacity duration-250',
            isMenuOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0',
            // desktop bar
            'md:pointer-events-auto md:static md:h-auto md:w-auto md:flex-row md:gap-9 md:bg-transparent md:opacity-100',
          )}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block py-2 text-xl font-semibold text-ink no-underline transition-colors hover:text-green md:py-0 md:text-sm md:font-semibold md:text-ink-secondary md:hover:text-green"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#request-demo"
              onClick={handleDemoClick}
              className="mt-2 inline-block cursor-pointer rounded-[10px] bg-[#1a1a1a] px-9 py-3.5 text-base font-bold text-white no-underline transition-colors hover:bg-[#333] md:mt-0 md:rounded-lg md:px-5 md:py-2 md:text-[13px]"
            >
              Request a Demo
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
