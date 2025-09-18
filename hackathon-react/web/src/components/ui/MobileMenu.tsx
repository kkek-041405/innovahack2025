import { useEffect, useState } from 'react'

type Props = {
  onRegisterClick?: () => void
}

export default function MobileMenu({ onRegisterClick }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuButton = document.getElementById('mobile-menu-button')
      const menu = document.getElementById('mobile-menu')

      if (
        isOpen &&
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div className="relative md:hidden">
      <button
        id="mobile-menu-button"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute right-0 top-12 z-30 w-screen max-w-xs animate-slide-in rounded-xl border border-white/10 bg-[rgba(11,16,32,0.95)] p-4 backdrop-blur"
          style={{ transformOrigin: 'top right' }}
        >
          <nav className="flex flex-col gap-4">
            {[
              { href: '#about', label: 'About' },
              { href: '#challenges', label: 'Challenges' },
              { href: '#mentors', label: 'Mentors' },
              { href: '#jury', label: 'Jury' },
              { href: '#schedule', label: 'Schedule' },
              { href: '#prizes', label: 'Prizes' },
              { href: '#partners', label: 'Partners' },
              { href: '#faq', label: 'FAQ' }
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2">
              <button
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary p-3 font-semibold text-white hover:bg-blue-600"
                onClick={() => { setIsOpen(false); onRegisterClick?.() }}
              >
                Register Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
