import { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  once?: boolean
}

export default function Reveal({ children, className = '', once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('animate-fade-in-up')
            node.classList.remove('opacity-0')
            if (once) observer.unobserve(node)
          } else if (!once) {
            node.classList.remove('animate-fade-in-up')
            node.classList.add('opacity-0')
          }
        })
      },
      { threshold: 0.1 }
    )

    node.classList.add('opacity-0')
    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
