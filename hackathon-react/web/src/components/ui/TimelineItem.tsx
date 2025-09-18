import { useEffect } from 'react'

interface TimelineItemProps {
  date: string
  time?: string
  title: string
  isFirst?: boolean
  isLast?: boolean
}

export default function TimelineItem({ date, time, title, isFirst, isLast }: TimelineItemProps) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.timeline-item')
    elements.forEach(el => observer.observe(el))

    return () => elements.forEach(el => observer.unobserve(el))
  }, [])

  return (
    <div className="timeline-item opacity-0 transition-all duration-500">
      <div className="flex">
        <div className="flex flex-col items-center">
          <div className={`h-5 w-5 rounded-full bg-primary ${!isFirst ? 'mt-2' : ''}`} />
          {!isLast && (
            <div className="h-full w-px bg-gradient-to-b from-primary to-primary/30 mt-1" />
          )}
        </div>
        <div className="ml-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-sm font-semibold bg-primary/20 text-primary px-2 py-0.5 rounded">{date}</span>
            {time && <span className="text-sm text-white/70">{time}</span>}
          </div>
          <p className="mt-1 font-medium">{title}</p>
        </div>
      </div>
    </div>
  )
}
