'use client'

import { useEffect, useState } from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function NavLink({ href, children, className = '' }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const checkActiveSection = () => {
      const scrollY = window.scrollY

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setIsActive(href === `#${sectionId}`)
        }
      })
    }

    window.addEventListener('scroll', checkActiveSection)
    // Initial check
    checkActiveSection()

    return () => window.removeEventListener('scroll', checkActiveSection)
  }, [href])

  return (
    <a 
      href={href} 
      className={`hover:text-white transition-colors relative ${isActive ? 'text-white font-medium' : 'text-white/80'} ${className}`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary" />
      )}
    </a>
  )
}