import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agentic India 30 – Hackathon',
  description:
    'A one-day, mentor-led hackathon to build autonomous and tool-using AI agents solving high-impact Indian use-cases. Anurag University, Hyderabad.' ,
  openGraph: {
    title: 'Agentic India 30 – Hackathon',
    description:
      'A one-day, mentor-led hackathon to build autonomous and tool-using AI agents solving high-impact Indian use-cases. Anurag University, Hyderabad.',
    url: 'https://agenticindia.example.com',
    siteName: 'Agentic India 30',
    images: [
      {
        url: 'https://storage.googleapis.com/reskilll/Flux_Dev_Design_a_modern_and_futuristic_logo_for_a_nationallev_1C1hN09e.jpg',
        width: 1200,
        height: 630,
        alt: 'Agentic India 30',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic India 30 – Hackathon',
    description:
      'A one-day, mentor-led hackathon to build autonomous and tool-using AI agents solving high-impact Indian use-cases. Anurag University, Hyderabad.',
    images: [
      'https://storage.googleapis.com/reskilll/Flux_Dev_Design_a_modern_and_futuristic_logo_for_a_nationallev_1C1hN09e.jpg',
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
