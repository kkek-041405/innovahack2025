import { useEffect } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidthClass?: string
}

export default function Modal({ open, onClose, title, children, maxWidthClass = 'max-w-3xl' }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full ${maxWidthClass} mx-auto rounded-xl border border-white/10 bg-[rgba(11,16,32,0.95)] p-4 shadow-xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-hidden`}
        onClick={stop}
      >
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 hover:bg-white/10"
            aria-label="Close"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="pt-4 overflow-y-auto pr-1 max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </div>
    </div>
  )
}
